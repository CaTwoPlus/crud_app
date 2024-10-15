CREATE TABLE ADMIN (
    email VARCHAR(255) PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    utolso_belepes_datuma DATETIME
);

CREATE TABLE CSATORNA (
    nev VARCHAR(100) PRIMARY KEY,
    kategoria VARCHAR(50),
    leiras TEXT
);

CREATE TABLE SZEREPLO (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100),
    szul_datum DATE,
    nemzetiseg VARCHAR(50),
    foglalkozas VARCHAR(100)
);

CREATE TABLE MUSOR (
	cim VARCHAR(255),
    ismerteto TEXT,
    epizod VARCHAR(50),
    PRIMARY KEY (cim, epizod)
);

CREATE TABLE KOZVETITES (
    musor_cim VARCHAR(255),
    csatorna_nev VARCHAR(100),
    idopont DATETIME,
    PRIMARY KEY (musor_cim, csatorna_nev, idopont),
    FOREIGN KEY (csatorna_nev) REFERENCES CSATORNA(nev),
    FOREIGN KEY (musor_cim) REFERENCES MUSOR(cim)
);

CREATE TABLE SZEREPLOK (
    musor_cim VARCHAR(255),
    epizod VARCHAR(50),
    szereplo VARCHAR(100),
    PRIMARY KEY (szereplo, musor_cim, epizod),
    FOREIGN KEY (musor_cim, epizod) REFERENCES MUSOR(cim, epizod)
);

CREATE TABLE SZEREPLESEK (
    szereplo_id INT,
	musor_cim VARCHAR(255),
	epizod VARCHAR(50),
    PRIMARY KEY (szereplo_id, musor_cim, epizod),
	FOREIGN KEY (musor_cim, epizod) REFERENCES MUSOR(cim, epizod),
    FOREIGN KEY (szereplo_id) REFERENCES SZEREPLO(id)
);

CREATE TABLE KEZELTE_KOZVETITES (
    email VARCHAR(255),
    musor_cim VARCHAR(255),
    csatorna_nev VARCHAR(100),
    idopont DATETIME,
    PRIMARY KEY (email, musor_cim, csatorna_nev, idopont),
    FOREIGN KEY (musor_cim, csatorna_nev, idopont) REFERENCES KOZVETITES(musor_cim, csatorna_nev, idopont),
    FOREIGN KEY (email) REFERENCES ADMIN(email)
);

CREATE TABLE KEZELTE_CSATORNA (
    email VARCHAR(255),
    csatornanev VARCHAR(100),
    PRIMARY KEY (csatornanev, email),
    FOREIGN KEY (email) REFERENCES ADMIN(email),
    FOREIGN KEY (csatornanev) REFERENCES CSATORNA(nev)
);

CREATE TABLE KEZELTE_MUSOR (
    email VARCHAR(255),
    musor_cim VARCHAR(255),
    epizod VARCHAR(50),
    PRIMARY KEY (email, musor_cim, epizod),
	FOREIGN KEY (musor_cim, epizod) REFERENCES MUSOR(cim, epizod),
    FOREIGN KEY (email) REFERENCES ADMIN(email)
);

CREATE TABLE KEZELTE_SZEREPLO (
    email VARCHAR(255),
    szereplo_id INT,
    PRIMARY KEY (szereplo_id, email),
    FOREIGN KEY (email) REFERENCES ADMIN(email),
    FOREIGN KEY (szereplo_id) REFERENCES SZEREPLO(id)
);