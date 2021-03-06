export type ccrd = {
    [key:string]:RegExp[]
}
export const ChangeColorRegDatas:ccrd={"CREATE":[/^c/i,/^c./i,/^c.e/i,/^c.ea/i,/^c.eat/i,/^c.eate/i],
"SELECT":[/^s/i,/^s./i,/^s.l/i,/^s.le/i,/^s.lec/i,/^s.lect/i],
"UPDATE":[/^u/i,/^u./i,/^u.d/i,/^u.da/i,/^u.dat/i,/^u.date/i],
"INSERT":[/^i/i,/^i./i,/^i.s/i,/^i.se/i,/^i.ser/i,/^i.sert/i],
"DELETE":[/^d/i,/^d./i,/^d.l/i,/^d.le/i,/^d.let/i,/^d.lete/i],
"COMMIT":[/^c/i,/^c./i,/^c.m/i,/^c.mm/i,/^c.mmi/i,/^c.mmit/i],
"ROLLBACK":[/^r/i,/^r./i,/^r.l/i,/^r.ll/i,/^r.llb/i,/^r.llba/i,/^r.llbac/i,/^r.llback/i],
"FROM":[/^f/i,/^f./i,/^f.o/i,/^f.om/i],
"GROUP BY":[/^g/i,/^g./i,/^g.o/i,/^g.ou/i,/^g.oup/i,/^g.oup /i,/^g.oup b/i,/^g.oup by/i],
"ORDER BY":[/^o/i,/^o./i,/^o.d/i,/^o.de/i,/^o.der/i,/^o.der /i,/^o.der b/i,/^o.der by/i],
"DESC":[/^d/i,/^d./i,/^d.s/i,/^d.sc/i],
"ASC":[/^a/i,/^a./i,/^a.c/i],
"PRIMARY KEY":[/^p/i,/^p./i,/^p.i/i,/^p.im/i,/^p.ima/i,/^p.imar/i,/^p.imary/i,/^p.imary /i,/^p.imary k/i,/^p.imary ke/i,/^p.imary key/i],
"TABLE":[/^t/i,/^t./i,/^t.b/i,/^t.bl/i,/^t.ble/i],
"VARCHAR":[/^v/i,/^v./i,/^v.r/i,/^v.rc/i,/^v.rch/i,/^v.rcha/i,/^v.rchar/i],
"INT":[/^i/i,/^i./i,/^i.t/i],
"TIMESTAMP":[/^t/i,/^t./i,/^t.m/i,/^t.me/i,/^t.mes/i,/^t.mest/i,/^t.mesta/i,/^t.mestam/i,/^t.mestamp/i],
"CASE":[/^c/i,/^c./i,/^c.s/i,/^c.se/i],
"WHERE":[/^w/i,/^w./i,/^w.e/i,/^w.er/i,/^w.ere/i],
"AUTO INCRIMENT":[/^a/i,/^a./i,/^a.t/i,/^a.to/i,/^a.to /i,/^a.to i/i,/^a.to in/i,/^a.to inc/i,/^a.to incr/i,/^a.to incri/i,/^a.to incrim/i,/^a.to incrime/i,/^a.to incrimen/i,/^a.to incriment/i],
"DISTINCT":[/^d/i,/^d./i,/^d.s/i,/^d.st/i,/^d.sti/i,/^d.stin/i,/^d.stinc/i,/^d.stinct/i],
"IN":[/^i/i,/^i./i],
"LIKE":[/^l/i,/^l./i,/^l.k/i,/^l.ke/i],
"AS":[/^a/i,/^a./i],
"AND":[/^a/i,/^a./i,/^a.d/i],
"OR":[/^o/i,/^o./i],
"JOIN":[/^j/i,/^j./i,/^j.i/i,/^j.in/i],
"INNER JOIN":[/^i/i,/^i./i,/^i.n/i,/^i.ne/i,/^i.ner/i,/^i.ner /i,/^i.ner j/i,/^i.ner jo/i,/^i.ner joi/i,/^i.ner join/i],
"LEFT OUTER JOIN":[/^l/i,/^l./i,/^l.f/i,/^l.ft/i,/^l.ft /i,/^l.ft o/i,/^l.ft ou/i,/^l.ft out/i,/^l.ft oute/i,/^l.ft outer/i,/^l.ft outer /i,/^l.ft outer j/i,/^l.ft outer jo/i,/^l.ft outer joi/i,/^l.ft outer join/i],
"RIGHT OUTER JOIN":[/^r/i,/^r./i,/^r.g/i,/^r.gh/i,/^r.ght/i,/^r.ght /i,/^r.ght o/i,/^r.ght ou/i,/^r.ght out/i,/^r.ght oute/i,/^r.ght outer/i,/^r.ght outer /i,/^r.ght outer j/i,/^r.ght outer jo/i,/^r.ght outer joi/i,/^r.ght outer join/i],
"FULL OUTER JOIN":[/^f/i,/^f./i,/^f.l/i,/^f.ll/i,/^f.ll /i,/^f.ll o/i,/^f.ll ou/i,/^f.ll out/i,/^f.ll oute/i,/^f.ll outer/i,/^f.ll outer /i,/^f.ll outer j/i,/^f.ll outer jo/i,/^f.ll outer joi/i,/^f.ll outer join/i],
"CROSS JOIN":[/^c/i,/^c./i,/^c.o/i,/^c.os/i,/^c.oss/i,/^c.oss /i,/^c.oss j/i,/^c.oss jo/i,/^c.oss joi/i,/^c.oss join/i],
"SUM":[/^s/i,/^s./i,/^s.m/i],
"AVG":[/^a/i,/^a./i,/^a.g/i],
"MAX":[/^m/i,/^m./i,/^m.x/i],
"MIN":[/^m/i,/^m./i,/^m.n/i],
"HAVING":[/^h/i,/^h./i,/^h.v/i,/^h.vi/i,/^h.vin/i,/^h.ving/i],
"LIMIT":[/^l/i,/^l./i,/^l.m/i,/^l.mi/i,/^l.mit/i],
"ANY":[/^a/i,/^a./i,/^a.y/i],
"EXISTS":[/^e/i,/^e./i,/^e.i/i,/^e.is/i,/^e.ist/i,/^e.ists/i],
"ALL":[/^a/i,/^a./i,/^a.l/i],
"BETWEEN":[/^b/i,/^b./i,/^b.t/i,/^b.tw/i,/^b.twe/i,/^b.twee/i,/^b.tween/i],
"OUTER":[/^o/i,/^o./i,/^o.t/i,/^o.te/i,/^o.ter/i],
"FULL":[/^f/i,/^f./i,/^f.l/i,/^f.ll/i],
"RIGHT":[/^r/i,/^r./i,/^r.g/i,/^r.gh/i,/^r.ght/i],
"INCRIMENT":[/^i/i,/^i./i,/^i.c/i,/^i.cr/i,/^i.cri/i,/^i.crim/i,/^i.crime/i,/^i.crimen/i,/^i.criment/i],
"AUTO":[/^a/i,/^a./i,/^a.t/i,/^a.to/i],
"CROSS":[/^c/i,/^c./i,/^c.o/i,/^c.os/i,/^c.oss/i],
"PRIMARY":[/^p/i,/^p./i,/^p.i/i,/^p.im/i,/^p.ima/i,/^p.imar/i,/^p.imary/i],
"KEY":[/^k/i,/^k./i,/^k.y/i],
"INNER":[/^i/i,/^i./i,/^i.n/i,/^i.ne/i,/^i.ner/i],
"GROUP":[/^g/i,/^g./i,/^g.o/i,/^g.ou/i,/^g.oup/i],
"ORDER":[/^o/i,/^o./i,/^o.d/i,/^o.de/i,/^o.der/i],
"BY":[/^b/i,/^b./i],
"INTO":[/^i/i,/^i./i,/^i.t/i,/^i.to/i],
"VALUES":[/^v/i,/^v./i,/^v.l/i,/^v.lu/i,/^v.lue/i,/^v.lues/i],
}