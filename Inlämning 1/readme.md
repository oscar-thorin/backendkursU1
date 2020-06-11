# Teori 1

###  1. Hur används HTTP-protokollet när du surfar in på en webbsida? Beskriv vilken metod, path, URI, response code och body som skickas in och svarar. Om du har svårt att bestämma dig för en url, ta ex.

[https://www.smp.se/kultur-noje/](https://www.smp.se/kultur-noje/?stopredirect)

Kortfattat, när webbläsaren navigerar till ovan länkad URI, så utför den en HTTP GET request metod mot HTTP servern på den hostade sidan. Servern fångar webbläsarens request och parsar önskvärd path, I detta fall `/kultur-noje`. Sidan svarar med en svarskod (antagligen 200 om den finns och kan levereras) samt en body som troligtvis är HTML, CSS, och JS.

### 2. Beskriv HTTP-protokollets vanligaste metoder och vad de gör. "http://localhost:3000/users?username=something" är en URI, beskriv vilka delar den består av och vad de kallas.

**GET**: Används för att förfråga om data från en resurs.

**POST**: Används för att skicka data till en server genom att skapa eller uppdatera resurser.

**DELETE**: Tar bort data. T.ex. en user.

**PUT**: Används för att skicka data till en server genom att skapa eller uppdatera. Precis som POST.

"http://localhost:3000/users?username=something" är en URI, beskriv vilka delar den består av och vad de kallas.

vad som står egentligen är "[http://localhost:3000/path?key=value](http://localhost:3000/path?key=value)".

-   *localhost* är en **domän**.
    
-   *3000* är en **port**.
    
-   */users* är en **path**
    
-   *?username=something* är en **query string**
    
-   hela länken är en **URL** *(egentligen en **URI**, men https:// är med och därför ska det kallas en URL)*
    
-   *https://* är **protokollet** på hur du får tillgång till sidan.

### 3. På vilka tre sätt kan man skicka in parametrar i en HTTP-request? Ge exempel med varje typ av parameter med curl, beskriv vilken typ av parameter som skickas in och värdet av parametern i respektive exempel.

De tre olika sätt du kan använda parametrar i en HTTP-request är följande:

1.  *query params*
    
2.  *path params*
    
3.  *header params*

*Sen korta exempel på ovanstående tre parametrar:*

**1.**  curl -X GET 'http://localhost:5000/locations?id=3'
    

-   *path:* locations
    
-   *key:* id
    
-   *value:* 3
    
Så det som står i exemplet kan man skriva om till:

-   '[http://localhost:5000/path?key=value](http://localhost:5000/path?key=value)'
    
**2.**  curl -X DELETE 'http://localhost:5000/users/3'

-   här skickar man en http delete request till pathen users/3.
    
-   Hela länken kan skrivas om som localhost:5000/users/:id *,eller /path/:id)*, vilket är path parametern, /:id, i detta fallet och har värdet 3.
     

**3.**  curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data

Här skickar jag en http post request, med json data, till servern som specificerar att det jag skickar in som header parameter är att min data jag skickar i requesten är json. Detta kan man se i -H "Content-Type: application/json"




