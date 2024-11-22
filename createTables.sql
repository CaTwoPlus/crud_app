create table admin (
    email varchar(255) primary key,
    admin_nev varchar(100) not null,
    jelszo varchar(255) not null,
    utolso_belepes_datuma datetime
);

create table csatorna (
    csatorna_nev varchar(100) primary key,
    kategoria varchar(50),
    leiras text
);

create table szereplo (
	id int auto_increment primary key,
    szereplo_nev varchar(100),
    szul_datum date,
    nemzetiseg varchar(50),
    foglalkozas varchar(100)
);

create table musor (
	musor_cim varchar(255),
    ismerteto text,
    epizod varchar(50),
    primary key (musor_cim, epizod)
);

create table kozvetites (
    csatorna_nev varchar(100),
    musor_cim varchar(255),
	epizod varchar(50),
    idopont datetime,
    primary key (csatorna_nev, musor_cim, epizod, idopont),
	foreign key (musor_cim, epizod) references musor(musor_cim, epizod),
    foreign key (csatorna_nev) references csatorna(csatorna_nev)
);

create table musor_szereploi (
    szereplo_id int,
	musor_cim varchar(255),
	epizod varchar(50),
    primary key (szereplo_id, musor_cim, epizod),
	foreign key (musor_cim, epizod) references musor(musor_cim, epizod),
    foreign key (szereplo_id) references szereplo(id)
);

create table kezelte_kozvetites (
    email varchar(255),
	csatorna_nev varchar(100),
    musor_cim varchar(255),
    epizod varchar(50),
    idopont datetime,
    primary key (email, csatorna_nev, musor_cim, epizod, idopont),
    foreign key (csatornanev, musorcim, epizod, idopont) references kozvetites(csatorna_nev, musor_cim, epizod, idopont),
    foreign key (email) references admin(email)
);

create table kezelte_csatorna (
    email varchar(255),
    csatorna_nev varchar(100),
    primary key (csatorna_nev, email),
    foreign key (email) references admin(email),
    foreign key (csatorna_nev) references csatorna(csatorna_nev)
);

create table kezelte_musor (
    email varchar(255),
    musor_cim varchar(255),
    epizod varchar(50),
    primary key (email, musor_cim, epizod),
	foreign key (musor_cim, epizod) references musor(musor_cim, epizod),
    foreign key (email) references admin(email)
);

create table kezelte_szereplo (
    email varchar(255),
    szereplo_id int,
    primary key (szereplo_id, email),
    foreign key (email) references admin(email),
    foreign key (szereplo_id) references szereplo(id)
);

create table kezelete_musor_szereploi ( 
	email varchar(255),
	szereplo_id int,
	musor_cim varchar(255),
	epizod varchar(50),
    primary key (email, szereplo_id, musor_cim, epizod),
    foreign key (szereplo_id) references szereplo(id),
    foreign key (musor_cim, epizod) references musor(musor_cim, epizod),
    foreign key (email) references admin(email)
);