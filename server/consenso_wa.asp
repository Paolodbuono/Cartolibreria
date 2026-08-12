<!--#include file="init.asp"-->
<%
' ============================================================
' Consenso WhatsApp - salvataggio consenso (pagina web)
' Segue lo stesso schema degli altri .asp in micro/
' Dati clienti : file dBase utenti/utentiw (colonna cellulare)
' Consensi    : file dBase consenso_whatsapp.dbf in /mdb-database/
' ============================================================

' Se True, verifica che il numero esista tra i clienti (utenti/utentiw)
' prima di salvare. Se il check da' problemi, metti False.
Dim CONTROLLA_CLIENTE
CONTROLLA_CLIENTE = False

Dim DBASE_CONSENSI
DBASE_CONSENSI = "/mdb-database/"

Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"

Function Sq(byval v)
    Sq = Replace(v & "", "'", "''")
End Function

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

Function GetConsentText(byval version)
    Dim v
    v = LCase(Trim(version))
    If v = "1.0" Then
        GetConsentText = "Acconsento a ricevere tramite WhatsApp da Cartolibreria Bonagura S.r.l. comunicazioni informative e commerciali relative a prodotti, servizi, disponibilita, compravendita di libri nuovi e usati, promozioni e iniziative dell'attivita."
    Else
        GetConsentText = ""
    End If
End Function

Function OpenDbf(folder)
    Dim c
    Set c = Server.CreateObject("ADODB.Connection")
    c.Open "driver={Microsoft dBase Driver (*.dbf)};dbq=" & Server.MapPath(folder) & ";"
    Set OpenDbf = c
End Function

Function ClienteEsiste(byval numero)
    Dim folders, f, c, rs
    folders = Array("/mdb-database/", "/mdb-database/pompei/")
    ClienteEsiste = False
    On Error Resume Next
    For Each f In folders
        Set c = OpenDbf(f)
        Set rs = c.Execute("SELECT COUNT(*) AS n FROM utenti WHERE cellulare = '" & numero & "'")
        If Err.Number = 0 Then If CLng(rs("n")) > 0 Then ClienteEsiste = True
        On Error Resume Next
        rs.Close
        If Not ClienteEsiste Then
            Set rs = c.Execute("SELECT COUNT(*) AS n FROM utentiw WHERE cellulare = '" & numero & "'")
            If Err.Number = 0 Then If CLng(rs("n")) > 0 Then ClienteEsiste = True
            On Error Resume Next
            rs.Close
        End If
        c.Close
        If ClienteEsiste Then Exit For
    Next
    On Error Resume Next
End Function

Function TrovaNome(byval numero)
    Dim folders, f, c, rs
    folders = Array("/mdb-database/", "/mdb-database/pompei/")
    TrovaNome = ""
    On Error Resume Next
    For Each f In folders
        Set c = OpenDbf(f)
        Set rs = c.Execute("SELECT nome FROM utenti WHERE cellulare = '" & numero & "'")
        If Err.Number = 0 Then
            If Not rs.EOF Then
                TrovaNome = Trim(rs("nome") & "")
                rs.Close
                c.Close
                Exit Function
            End If
        End If
        On Error Resume Next
        rs.Close
        Set rs = c.Execute("SELECT nome FROM utentiw WHERE cellulare = '" & numero & "'")
        If Err.Number = 0 Then
            If Not rs.EOF Then
                TrovaNome = Trim(rs("nome") & "")
                rs.Close
                c.Close
                Exit Function
            End If
        End If
        On Error Resume Next
        rs.Close
        c.Close
    Next
    On Error Resume Next
End Function

Dim telefono, versione, provenienza, stato, testo, nomeCli
telefono = NormalizePhone(Request.Form("telefono"))
versione = Trim(Request.Form("versione") & "")
provenienza = Trim(Request.Form("provenienza") & "")
stato = LCase(Trim(Request.Form("stato") & ""))
If stato <> "si" And stato <> "no" Then stato = "si"

If telefono = "" Then Call Fail("Numero di cellulare mancante.")
If Len(telefono) < 10 Or Len(telefono) > 13 Then Call Fail("Numero di cellulare non valido.")

testo = GetConsentText(versione)
If testo = "" Then Call Fail("Versione del consenso non riconosciuta.")
If provenienza = "" Then provenienza = "pagina web"

If CONTROLLA_CLIENTE Then
    If Not ClienteEsiste(telefono) Then Call Fail("Il numero inserito non risulta tra i clienti della Cartolibreria Bonagura. Per ulteriori informazioni contattaci.")
End If

nomeCli = TrovaNome(telefono)

Dim conn, rs, sql, statoCorrente
Set conn = OpenDbf(DBASE_CONSENSI)

sql = "SELECT stato FROM consenso_whatsapp WHERE telefono = '" & telefono & "'"
Set rs = conn.Execute(sql)
If Not rs.EOF Then
    statoCorrente = LCase(Trim(rs("stato") & ""))
    If stato = "si" And statoCorrente = "si" Then
        rs.Close
        conn.Close
        Response.Write "{""Status"":""ok"",""Nota"":""consenso gia' registrato""}"
        Response.End
    End If
    rs.Close
    conn.Execute "DELETE FROM consenso_whatsapp WHERE telefono='" & telefono & "'"
    If stato = "si" Then
        conn.Execute "INSERT INTO consenso_whatsapp (nome, telefono, data_ora, versione, testo, prov, stato, data_revoca) VALUES ('" & Sq(nomeCli) & "', '" & telefono & "', '" & NowStr() & "', '" & Sq(versione) & "', '" & Sq(testo) & "', '" & Sq(provenienza) & "', 'si', '')"
    Else
        conn.Execute "INSERT INTO consenso_whatsapp (nome, telefono, data_ora, versione, testo, prov, stato, data_revoca) VALUES ('" & Sq(nomeCli) & "', '" & telefono & "', '" & NowStr() & "', '" & Sq(versione) & "', '" & Sq(testo) & "', '" & Sq(provenienza) & "', 'revocato', '" & NowStr() & "')"
    End If
Else
    rs.Close
    conn.Execute "INSERT INTO consenso_whatsapp (nome, telefono, data_ora, versione, testo, prov, stato, data_revoca) VALUES ('" & Sq(nomeCli) & "', '" & telefono & "', '" & NowStr() & "', '" & Sq(versione) & "', '" & Sq(testo) & "', '" & Sq(provenienza) & "', '" & stato & "', '')"
End If
conn.Close

Response.Write "{""Status"":""ok""}"
%>
