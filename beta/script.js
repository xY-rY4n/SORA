var UNISUNDA = new Array();

// panungtung
UNISUNDA["+ng"] = "\u1B80";
UNISUNDA["+r"] = "\u1B81";
UNISUNDA["+h"] = "\u1B82";
UNISUNDA["+O"] = "\u1BAA";
// vokal mandiri
UNISUNDA["A"] = "\u1B83";
UNISUNDA["I"] = "\u1B84";
UNISUNDA["U"] = "\u1B85";

UNISUNDA["\u00C9"] = "\u1B86";
UNISUNDA["O"] = "\u1B87";
UNISUNDA["E"] = "\u1B88";
UNISUNDA["EU"] = "\u1B89";
// konsonan ngalagena
UNISUNDA["k"] = "\u1B8A";
UNISUNDA["q"] = "\u1B8B";
UNISUNDA["g"] = "\u1B8C";
UNISUNDA["ng"] = "\u1B8D";
UNISUNDA["c"] = "\u1B8E";
UNISUNDA["j"] = "\u1B8F";
UNISUNDA["z"] = "\u1B90";
UNISUNDA["ny"] = "\u1B91";
UNISUNDA["t"] = "\u1B92";
UNISUNDA["d"] = "\u1B93";
UNISUNDA["n"] = "\u1B94";
UNISUNDA["p"] = "\u1B95";
UNISUNDA["f"] = "\u1B96";
UNISUNDA["v"] = "\u1B97";
UNISUNDA["b"] = "\u1B98";
UNISUNDA["m"] = "\u1B99";
UNISUNDA["y"] = "\u1B9A";
UNISUNDA["r"] = "\u1B9B";
UNISUNDA["l"] = "\u1B9C";
UNISUNDA["w"] = "\u1B9D";
UNISUNDA["s"] = "\u1B9E";
UNISUNDA["x"] = "\u1B9F";
UNISUNDA["h"] = "\u1BA0";
UNISUNDA["kh"] = "\u1BAE";
UNISUNDA["sy"] = "\u1BAF";
// konsonan sisip
UNISUNDA["+ya"] = "\u1BA1";
UNISUNDA["+ra"] = "\u1BA2";
UNISUNDA["+la"] = "\u1BA3";
// suara vokal
UNISUNDA["a"] = "\u1B83";
UNISUNDA["i"] = "\u1BA4";
UNISUNDA["u"] = "\u1BA5";

UNISUNDA["\u00E9"] = "\u1BA6";
UNISUNDA["o"] = "\u1BA7";
UNISUNDA["e"] = "\u1BA8";
UNISUNDA["eu"] = "\u1BA9";
// angka
UNISUNDA["0"] = "\u1BB0";
UNISUNDA["1"] = "\u1BB1";
UNISUNDA["2"] = "\u1BB2";
UNISUNDA["3"] = "\u1BB3";
UNISUNDA["4"] = "\u1BB4";
UNISUNDA["5"] = "\u1BB5";
UNISUNDA["6"] = "\u1BB6";
UNISUNDA["7"] = "\u1BB7";
UNISUNDA["8"] = "\u1BB8";
UNISUNDA["9"] = "\u1BB9";

PAT_V = 1;
PAT_VK = 2;
PAT_KV = 3;
PAT_KVK = 4;
PAT_KRV = 5;
PAT_KRVK = 6;
PAT_SILABA = 7;
PAT_LAIN = 0;

function sundaahir(huruf) {
  var retval = "";

  if (huruf == "h" || huruf == "r" || huruf == "ng") {
    retval = UNISUNDA["+" + huruf];
  } else {
    retval = UNISUNDA[huruf] + UNISUNDA["+O"];
  }

  return retval;
}

function convertToSunda(iStr) {
  var sundaText = "";

  iStr = iStr.toLowerCase();

  var iLength = iStr.length;
  var idx = 0;
  var jump = 0;

  var tStr = "";
  var oStr = "";
  var r;
  var silaba;
  var suku;
  var polasuku = PAT_LAIN;

  var KONS = "kh|sy|[b-df-hj-mp-tv-z]|ng|ny|n";
  var VOK = "[aiuo\u00E9]|eu|e";

  var REP = "[yrl]";
  var SILABA = "^";
  SILABA += "(" + KONS + ")?";
  SILABA += "(" + REP + ")?";
  SILABA += "(" + VOK + ")";
  SILABA += "(" + KONS + ")?";
  SILABA += "(" + VOK + "|" + REP + ")?";
  KONSONAN = "^(" + KONS + ")";
  var DIGIT = "^([0-9]+)";

  while (idx < iLength) {
    suku = "";
    r = iStr.match(SILABA);
    if (r !== null) {
      // cari pola:
      if (r[1]) {
        if (r[4]) {
          if (r[2]) {
            if (r[5]) {
              polasuku = PAT_KRV;
            } else {
              polasuku = PAT_KRVK;
            }
          } else {
            if (r[5]) {
              polasuku = PAT_KV;
            } else {
              polasuku = PAT_KVK;
            }
          }
        } else {
          if (r[2]) {
            polasuku = PAT_KRV;
          } else {
            polasuku = PAT_KV;
          }
        }
      } else {
        if (r[4]) {
          if (r[5]) {
            polasuku = PAT_V;
          } else {
            polasuku = PAT_VK;
          }
        } else {
          polasuku = PAT_V;
        }
      }

      // bentuk:
      if (polasuku == PAT_KRVK) {
        suku = r[1] + r[2] + r[3] + r[4];
        silaba = UNISUNDA[r[1]];
        silaba += UNISUNDA["+" + r[2] + ""];
        silaba += UNISUNDA[r[3]];
        silaba += sundaahir(r[4]);
      } else if (polasuku == PAT_KRV) {
        suku = r[1] + r[2] + r[3];
        silaba = UNISUNDA[r[1]];
        silaba += UNISUNDA["+" + r[2] + ""];
        silaba += UNISUNDA[r[3]];
      } else if (polasuku == PAT_KVK) {
        suku = r[1] + r[3] + r[4];
        silaba = UNISUNDA[r[1]];
        silaba += UNISUNDA[r[3]];
        silaba += sundaahir(r[4]);
      } else if (polasuku == PAT_KV) {
        suku = r[1] + r[3];
        silaba = UNISUNDA[r[1]];
        silaba += UNISUNDA[r[3]];
      } else if (polasuku == PAT_VK) {
        suku = r[3] + r[4];
        silaba = UNISUNDA[r[3].toUpperCase()];
        silaba += sundaahir(r[4]);
      } else {
        suku = r[3];
        silaba = UNISUNDA[suku.toUpperCase()];
      }
      oStr += silaba;
      tStr += suku + "(" + polasuku + "):";
      polasuku = PAT_SILABA;
    } else {
      r = iStr.match(KONSONAN);
      if (r != null) {
        suku = r[1];
        if (polasuku == PAT_SILABA) {
          silaba = sundaahir(suku);
        } else {
          silaba = UNISUNDA[suku] + UNISUNDA["+O"];
        }
        oStr += silaba;
        tStr += suku + ";";
      } else {
        r = iStr.match(DIGIT);
        if (r != null) {
          silaba = "|";
          suku = r[1];
          l = suku.length;
          i = 0;
          while (i < l) {
            silaba += UNISUNDA[suku.substr(i, 1)];
            i += 1;
          }
          silaba += "|";
          oStr += silaba;
        } else {
          suku = iStr.substr(0, 1);
          silaba = suku;
          oStr += suku;
        }

        tStr += suku + "(?)";
      }
      polasuku = PAT_LAIN;
    }
    iStr = iStr.substr(suku.length);
    idx += suku.length;
  }

  return oStr;
}

var SUNDAUNI = new Array();

// konsonan ngalagena
SUNDAUNI["\u1B8A"] = "k";
SUNDAUNI["\u1B8B"] = "q";
SUNDAUNI["\u1B8C"] = "g";
SUNDAUNI["\u1B8D"] = "ng";
SUNDAUNI["\u1B8E"] = "c";
SUNDAUNI["\u1B8F"] = "j";
SUNDAUNI["\u1B90"] = "z";
SUNDAUNI["\u1B91"] = "ny";
SUNDAUNI["\u1B92"] = "t";
SUNDAUNI["\u1B93"] = "d";
SUNDAUNI["\u1B94"] = "n";
SUNDAUNI["\u1B95"] = "p";
SUNDAUNI["\u1B96"] = "f";
SUNDAUNI["\u1B97"] = "v";
SUNDAUNI["\u1B98"] = "b";
SUNDAUNI["\u1B99"] = "m";
SUNDAUNI["\u1B9A"] = "y";
SUNDAUNI["\u1B9B"] = "r";
SUNDAUNI["\u1B9C"] = "l";
SUNDAUNI["\u1B9D"] = "w";
SUNDAUNI["\u1B9E"] = "s";
SUNDAUNI["\u1B9F"] = "x";
SUNDAUNI["\u1BA0"] = "h";
SUNDAUNI["\u1BAE"] = "kh";
SUNDAUNI["\u1BAF"] = "sy";

//  vokal
SUNDAUNI["\u1BA4"] = "i";
SUNDAUNI["\u1BA5"] = "u";

SUNDAUNI["\u1BA6"] = "\u00E9";
SUNDAUNI["\u1BA7"] = "o";
SUNDAUNI["\u1BA8"] = "e";
SUNDAUNI["\u1BA9"] = "eu";
SUNDAUNI["\u1BAA"] = "";

// vokal mandiri
SUNDAUNI["\u1B83"] = "a";
SUNDAUNI["\u1B84"] = "i";
SUNDAUNI["\u1B85"] = "u";

SUNDAUNI["\u1B86"] = "\u00E9";
SUNDAUNI["\u1B87"] = "o";
SUNDAUNI["\u1B88"] = "e";
SUNDAUNI["\u1B89"] = "eu";

// konsonan sisip
SUNDAUNI["\u1BA1"] = "y";
SUNDAUNI["\u1BA2"] = "r";
SUNDAUNI["\u1BA3"] = "l";

// panungtung
SUNDAUNI["\u1B80"] = "ng";
SUNDAUNI["\u1B81"] = "r";
SUNDAUNI["\u1B82"] = "h";

// angka
SUNDAUNI["\u1BB0"] = "0";
SUNDAUNI["\u1BB1"] = "1";
SUNDAUNI["\u1BB2"] = "2";
SUNDAUNI["\u1BB3"] = "3";
SUNDAUNI["\u1BB4"] = "4";
SUNDAUNI["\u1BB5"] = "5";
SUNDAUNI["\u1BB6"] = "6";
SUNDAUNI["\u1BB7"] = "7";
SUNDAUNI["\u1BB8"] = "8";
SUNDAUNI["\u1BB9"] = "9";

function convertToLatin(iStr) {
  //implementasi here
  var iLength = iStr.length;
  var idx = 0;
  var jump = 0;

  var tStr = "";
  var oStr = "";

  // Pola KRV0K:
  var NGALAGENA = "([\u1B8A-\u1BA0])";
  var VOKALMANDIRI = "([\u1B83-\u1B89])";
  var SUBJOIN = "([\u1BA1-\u1BA3])?";
  var VOKAL = "([\u1BA4-\u1BAA])?";
  var TUNGTUNG = "([\u1B80-\u1B82])?";
  var ANGKA = "([\u1BB0-\u1BB9])";

  var KRV0K = "^" + NGALAGENA + SUBJOIN + VOKAL + TUNGTUNG;
  var VK = "^" + VOKALMANDIRI + TUNGTUNG;
  var angka = "^(\\|)?" + ANGKA + "(\\|)?";

  var suku;
  var silaba;
  var r;

  while (idx < iLength) {
    suku = "";
    silaba = "";
    r = iStr.match(KRV0K);
    if (r != null) {
      // K
      suku += r[1];
      silaba += SUNDAUNI[r[1]];
      if (r[2]) {
        // KR
        suku += r[2];
        silaba += SUNDAUNI[r[2]];
      }
      if (r[3]) {
        // K(R)V
        suku += r[3];
        silaba += SUNDAUNI[r[3]];
      } else {
        silaba += "";
      }
      if (r[4]) {
        // K(R)(V)(K)
        suku += r[4];
        silaba += SUNDAUNI[r[4]];
      }
      oStr += silaba;
      tStr += suku + ":";
    } else {
      r = iStr.match(VK);
      if (r != null) {
        // V
        suku += r[1];
        silaba += SUNDAUNI[r[1]];
        if (r[2]) {
          // V(K)
          suku += r[2];
          silaba += SUNDAUNI[r[2]];
        }
        oStr += silaba;
        tStr += suku + ":";
      } else {
        r = iStr.match(angka);
        if (r) {
          //angka:
          if (r[1]) {
            suku += r[1];
          }
          suku += r[2];
          oStr += SUNDAUNI[r[2]];
          if (r[3]) {
            suku += r[3];
          }
        } else {
          suku += iStr.substr(0, 1);
          oStr += suku;
          tStr += suku + "(?)";
        }
      }
    }
    iStr = iStr.substr(suku.length);
    idx += suku.length;
  }
  return oStr;
}

var flag = false;

function writeLatin() {
  if (flag == false) {
    flag = true;

    var sundaText = document.getElementById("SundaText").value;

    var latinText = convertToLatin(sundaText);

    document.getElementById("LatinText").value = latinText;

    flag = false;
  }
}

function writeSunda() {
  if (flag == false) {
    flag = true;

    var latinText = document.getElementById("LatinText").value;

    var sundaText = convertToSunda(latinText);

    document.getElementById("SundaText").value = sundaText;

    flag = false;
  }
}

function setbg(id, color) {
  document.getElementById(id).style.background = color;
}

var light = true;
function switchTheme(){
	if (light){
		document.getElementById("actuallyvideo").classList.add("hideme");
		document.getElementById("actuallyvideo1").classList.remove("hideme");
	} else {
		document.getElementById("actuallyvideo").classList.remove("hideme");
		document.getElementById("actuallyvideo1").classList.add("hideme");
	}
	light = !light;
}
switchTheme();