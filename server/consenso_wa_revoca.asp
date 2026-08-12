<!--#include file="init.asp"-->
<%
' ============================================================
' Consenso WhatsApp - REVOCA
' - Chiamata diretta (admin/API): telefono via form o query -> revoca sempre
' - Webhook 360dialog (messaggio in arrivo): JSON con from e text.body
'   -> revoca SOLO se il testo contiene il trigger (TRIGGER_STOP)
' ============================================================

Dim DBASE_CONSENSI
DBASE_CONSENSI = "/mdb-database/"

Dim TRIGGER_STOP
TRIGGER_STOP = "stop"

Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"

Function NormalizePhone(byval value)
    Dim out, i, ch
    out = ""
    For i = 1 To Len(value)
        ch = Mid(value, i, 1)
        If IsNumeric(ch) Then out = out & ch
    Next
    NormalizePhone = out
End Function

Function EscapeJson(byval value)
    Dim out, i, ch
    out = ""
    For i = 1 To Len(value)
        ch = Mid(value, i, 1)
        Select Case ch
            Case """" : out = out & "\"""
            Case "\" : out = out & "\\"
            Case Chr(10) : out = out & "\n"
            Case Chr(13) : out = out & "\r"
            Case Else
                If AscW(ch) >= 32 Then out = out & ch
        End Select
    Next
    EscapeJson = out
End Function

Function NowStr()
    NowStr = Year(Now()) & "-" & Right("0" & Month(Now()), 2) & "-" & Right("0" & Day(Now()), 2) & " " & Right("0" & Hour(Now()), 2) & ":" & Right("0" & Minute(Now()), 2) & ":" & Right("0" & Second(Now()), 2)
End Function

Sub Fail(byval message)
    Response.Write "{""Error"":""" & EscapeJson(message) & """}"
    Response.End
End Sub

Function JsonValue(byval json, byval key)
    Dim re, m, temp
    Set re = New RegExp
    re.Pattern = """?" & key & """?\s*:\s*""([^""]*)"""
    re.IgnoreCase = True
    Set m = re.Execute(json)
    If m.Count > 0 Then
        temp = m(0).SubMatches(0)
        temp = Replace(temp, "\n", "")
        temp = Replace(temp, "\r", "")
        JsonValue = temp
    Else
        JsonValue = ""
    End If
End Function

Function OpenDbf(folder)
    Dim c
    Set c = Server.CreateObject("ADODB.Connection")
    c.Open "driver={Microsoft dBase Driver (*.dbf)};dbq=" & Server.MapPath(folder) & ";"
    Set OpenDbf = c
End Function

Dim telefono, body, msgText, binBody, i, fromWebhook
telefono = ""
fromWebhook = False

If Request.Form("telefono") <> "" Then
    telefono = NormalizePhone(Request.Form("telefono"))
ElseIf Request.QueryString("telefono") <> "" Then
    telefono = NormalizePhone(Request.QueryString("telefono"))
End If

body = ""
On Error Resume Next
If Request.TotalBytes > 0 Then
    binBody = Request.BinaryRead(Request.TotalBytes)
    For i = 0 To UBound(binBody)
        body = body & Chr(binBody(i))
    Next
End If
On Error Resume Next

If telefono = "" Then
    telefono = NormalizePhone(JsonValue(body, "from"))
    fromWebhook = True
End If

msgText = ""
If Request.Form("text") <> "" Then
    msgText = LCase(Request.Form("text"))
ElseIf Request.QueryString("text") <> "" Then
    msgText = LCase(Request.QueryString("text"))
Else
    msgText = LCase(JsonValue(body, "body"))
End If

If fromWebhook Then
    If InStr(msgText, TRIGGER_STOP) = 0 Then
        Response.Write "{""Status"":""ok""}"
        Response.End
    End If
End If

If telefono = "" Then Call Fail("Numero di cellulare mancante.")

Dim conn, rs, statoCorrente
Set conn = OpenDbf(DBASE_CONSENSI)
Set rs = conn.Execute("SELECT stato FROM consenso_whatsapp WHERE telefono='" & telefono & "'")
If Not rs.EOF Then
    statoCorrente = LCase(Trim(rs("stato") & ""))
    rs.Close
    If statoCorrente = "si" Then
        conn.Execute "DELETE FROM consenso_whatsapp WHERE telefono='" & telefono & "'"
        conn.Execute "INSERT INTO consenso_whatsapp (nome, telefono, data_ora, versione, testo, prov, stato, data_revoca) VALUES ('', '" & telefono & "', '" & NowStr() & "', '', '', 'whatsapp stop', 'revocato', '" & NowStr() & "')"
    End If
Else
    rs.Close
End If
conn.Close

Response.Write "{""Status"":""ok""}"
%>
