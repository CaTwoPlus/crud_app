create table admin (
    email varchar(255) primary key,
    nev varchar(100) not null,
    jelszo varchar(255) not null,
    utolso_belepes_datuma datetime
);

create table csatorna (
    nev varchar(100) primary key,
    kategoria varchar(50),
    leiras text
);

create table szereplo (
	id int auto_increment primary key,
    nev varchar(100),
    szul_datum date,
    nemzetiseg varchar(50),
    foglalkozas varchar(100)
);

create table musor (
	cim varchar(255),
    ismerteto text,
    epizod varchar(50),
    primary key (cim, epizod)
);

create table kozvetites (
    csatornanev varchar(100),
    musorcim varchar(255),
	epizod varchar(50),
    idopont datetime,
    primary key (csatornanev, musorcim, epizod, idopont),
	foreign key (musorcim, epizod) references musor(cim, epizod),
    foreign key (csatornanev) references csatorna(nev)
);

create table musor_szereploi (
    szereplo_id int,
	musorcim varchar(255),
	epizod varchar(50),
    primary key (szereplo_id, musorcim, epizod),
	foreign key (musorcim, epizod) references musor(cim, epizod),
    foreign key (szereplo_id) references szereplo(id)
);

create table kezelte_kozvetites (
    email varchar(255),
	csatornanev varchar(100),
    musorcim varchar(255),
    epizod varchar(50),
    idopont datetime,
    primary key (email, csatornanev, musorcim, epizod, idopont),
    foreign key (csatornanev, musorcim, epizod, idopont) references kozvetites(csatornanev, musorcim, epizod, idopont),
    foreign key (email) references admin(email)
);

create table kezelte_csatorna (
    email varchar(255),
    csatornanev varchar(100),
    primary key (csatornanev, email),
    foreign key (email) references admin(email),
    foreign key (csatornanev) references csatorna(nev)
);

create table kezelte_musor (
    email varchar(255),
    musorcim varchar(255),
    epizod varchar(50),
    primary key (email, musorcim, epizod),
	foreign key (musorcim, epizod) references musor(cim, epizod),
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
	musorcim varchar(255),
	epizod varchar(50),
    primary key (email, szereplo_id, musorcim, epizod),
    foreign key (szereplo_id) references szereplo(id),
    foreign key (musorcim, epizod) references musor(cim, epizod),
    foreign key (email) references admin(email)
);