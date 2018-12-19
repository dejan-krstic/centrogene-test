# centrogene-test

### Funkcionalni zahtevi

Potrebno je kreirati aplikaciju za skladistenje i prikaz pacijentata koji su prijavljeni u nekoj privatnoj klinici. 

Sam izgled ove aplikacije nije od presudne vaznosti i nema potrebe da trosis puno vremena na stilsko usavrsavanje sem onoga sto smatras da ne neophodno kako bi podaci bili predstavljeni korisniku na adekvatan nacim. Kljucno je fokusirati se na funkcionalnost.

Aplikacija treba da sadrzi, kao minimum, stranu za login samog korisnika i osnovnu stranu za prikaz (main view) koja ima nekoliko funkcionalnih elemenata, oni su:
prikaz svih pacijenata koji su vec uneti od strane korisnika.
unos kljucne reci naspram koje ce se pretraziti i prikazati svi pacijenti, kljucna rec treba da se trazi u imenu samog pacijenta ali bi ta pretraga mogla da se prosiri i na neke druge njegove podatke.
mogucnost otvaranja forme za unos novih pacijenata (ova forma moze da se nalazi na posebnoj stranici). 
Forma za unos pacijenata mora imati, pored ostalih bazicnih podataka o samom pacijentu, opciju za unos slika (samog pacijenta)
Pacijenti na glavnoj strani treba da su prikazani samo sa osnovnim, licnim informacijama (ime, prezime, godine) kao i sa slikom ako je ona uneta. Klikom na osnovni prikaz nekog pacijenta korisnik aplikacije treba da se preusmeri ili na drugu stranicu ili da se otvori poseban pop-up prikaz svih njegovih podataka.
Mora da postoji mogucnost da se pacijent izbrise iz sistema, uzeti u obzir da je ovo nepovratna operacija i stoga je to potrebno posebno naglasiti korisniku.

### Softverski zahtevi 
Frontend -  Primarno treba koristiti ili cist Java Script ili, jos bolje, neku od vezija Angulara (AngularJS ili noviji). Ako ovo nije moguce moze se koristiti neki drugi framework JS-a. 
Backend - Moze se koristiti bilo koji jezik, Java, PHP, NodeJS, Python itd. Sami ste izrazili zelju da radite u NodeJS i to je odlican predlog.
DataBase - Iako se preferira upotreba SQL tipa baze podataka iz razloga koji ce biti naveden u nastavku, moze se koristiti bilo koji tip baze za cuvanje podataka, SQL ili NoSQL.

### Dodatno
Kao veliki plus u izradi zadatka ce se smatrati sledece funkcionalnosti aplikacije:

Sami podaci korisnika aplikacije se nakon logovanja moraju proveriti radi validacije. Podaci o korisnicima (Doktorima ili medic. osoblju) se mogu cuvatu na razne nacije: u sklopu samo servisa u nekoj programskoj strukturi, u sklopu fajla na fajl sistemu racunara i sl. Pozeljno je da se i njihovi podacu cuvaju u samoj bazi.
Svaki pacijent moze imati neko oboljenje vezano za njega, unos ovog oboljena se moze ostaviti kao opcija na formi za unos samog pacijneta. Ako oboljenje nije uneto pri inicijalnom unosu pacijenta u sistem ono se moze uneti kasnije.
Svako dodatno stilsko usavrsavanja koje doprinosi samom "user experience-u" je dobrodoslo.

### Napomena: 
Svaka od ovih stavki se moze ispuniti ili potpuno ili delimicno, bitno je postoji neko realno poboljsanje u radu same aplikacije.
Ne ustrucavajte se da nas kontaktirate u vezi bilo kakvih pitanja vezanih za samu postavku zadatka ili o firmi.

Srecno u radu! 
