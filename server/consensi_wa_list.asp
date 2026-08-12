<!--#include file="init.asp"-->
<!--#include file="consenso_admin_config.asp"-->
<%
' ============================================================
' Consenso WhatsApp - elenco consensi (admin)
' Richiede ?password= (vedi consenso_admin_config.asp)
' Segue lo stesso schema degli altri .asp in micro/
' ============================================================

Dim DBASE_CONSENSI
DBASE_CONSENSI = "/mdb-database/"

Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"

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

Dim password
password = Trim(Request.QueryString("password") & "")
If password = "" Then password = Trim(Request.Form("password") & "")
If password <> ADMIN_PASSWORD Then
    Response.Status = "403 Forbidden"
    Response.Write "{""Error"":""Accesso negato""}"
    Response.End
End If

Dim conn, rs, num
Response.Write "["
Set conn = OpenDbf(DBASE_CONSENSI)
Set rs = conn.Execute("SELECT nome, telefono, stato, data_ora, prov FROM consenso_whatsapp ORDER BY data_ora DESC")
num = 0
While Not rs.EOF
    If num > 0 Then Response.Write ","
    Response.Write "{"
    Response.Write """nome"":""" & EscapeJson(Trim(rs("nome") & "")) & """"
    Response.Write ",""telefono"":""" & EscapeJson(Trim(rs("telefono") & "")) & """"
    Response.Write ",""stato"":""" & EscapeJson(Trim(rs("stato") & "")) & """"
    Response.Write ",""data_ora"":""" & EscapeJson(Trim(rs("data_ora") & "")) & """"
    Response.Write ",""provenienza"":""" & EscapeJson(Trim(rs("prov") & "")) & """"
    Response.Write "}"
    num = num + 1
    rs.MoveNext
Wend
rs.Close
conn.Close
Response.Write "]"
%>
