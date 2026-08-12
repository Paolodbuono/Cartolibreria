<!--#include file="init.asp"-->
<!--#include file="consenso_admin_config.asp"-->
<%
' ============================================================
' Consenso WhatsApp - CANCELLAZIONE record (uso admin)
' POST/GET: password + telefono
' ============================================================

Dim DBASE_CONSENSI
DBASE_CONSENSI = "/mdb-database/"

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

Function OpenDbf(folder)
    Dim c
    Set c = Server.CreateObject("ADODB.Connection")
    c.Open "driver={Microsoft dBase Driver (*.dbf)};dbq=" & Server.MapPath(folder) & ";"
    Set OpenDbf = c
End Function

Dim password, telefono, conn
password = Trim(Request.Form("password") & "")
If password = "" Then password = Trim(Request.QueryString("password") & "")
If password <> ADMIN_PASSWORD Then
    Response.Status = "403 Forbidden"
    Response.Write "{""Error"":""Accesso negato""}"
    Response.End
End If

telefono = NormalizePhone(Request.Form("telefono"))
If telefono = "" Then telefono = NormalizePhone(Request.QueryString("telefono"))
If telefono = "" Then
    Response.Write "{""Error"":""Numero di cellulare mancante.""}"
    Response.End
End If

Set conn = OpenDbf(DBASE_CONSENSI)
conn.Execute "DELETE FROM consenso_whatsapp WHERE telefono='" & telefono & "'"
conn.Close

Response.Write "{""Status"":""ok""}"
%>
