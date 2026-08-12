<%
' ============================================================
' Consenso WhatsApp - SETUP tabella (esegui UNA volta da browser)
' Crea /mdb-database/consenso_whatsapp.dbf se non esiste
' ============================================================

Dim DBASE_CONSENSI
DBASE_CONSENSI = "/mdb-database/"

Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"

Function OpenDbf(folder)
    Dim c
    Set c = Server.CreateObject("ADODB.Connection")
    c.Open "driver={Microsoft dBase Driver (*.dbf)};dbq=" & Server.MapPath(folder) & ";"
    Set OpenDbf = c
End Function

Response.Write "<html><head><meta charset=""utf-8""><title>Setup consenso</title></head><body>"

Dim conn, rs
Set conn = OpenDbf(DBASE_CONSENSI)

On Error Resume Next
Set rs = conn.Execute("SELECT nome FROM consenso_whatsapp")
If Err.Number = 0 Then
    Response.Write "<p><b>La tabella consenso_whatsapp esiste gia'.</b></p>"
    rs.Close
Else
    Err.Clear
    On Error GoTo 0
    conn.Execute "CREATE TABLE consenso_whatsapp (nome char(60), telefono char(20), data_ora char(20), versione char(10), testo char(240), prov char(20), stato char(20), data_revoca char(20))"
    If Err.Number = 0 Then
        Response.Write "<p><b>Tabella creata con successo.</b></p>"
    Else
        Response.Write "<p><b>Errore creazione tabella:</b> " & Server.HTMLEncode(Err.Description) & "</p>"
    End If
End If

Set conn = Nothing

Response.Write "<p><a href=""consenso_setup.asp"">Riesegui</a></p>"
Response.Write "</body></html>"
%>
