// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { parseFoursquareResponse } from "../foursquareApi";

describe("parseFoursquareResponse", function () {
  // actual response using "52f2ab2ebcbc57f1066b8b1c" (fruitVegStore), 32.789008, -79.932115 (CHS)
  const httpTestResponse = {
    statusCode: 200,
    content: '{"meta":{"code":200,"requestId":"58e50cb5db04f53c1b6a5275"},"response":{"venues":[{"id":"4b5f8468f964a52011bf29e3","name":"Starbucks","contact":{"phone":"8438058007","formattedPhone":"(843) 805-8007","twitter":"starbucks","facebook":"22092443056","facebookUsername":"Starbucks","facebookName":"Starbucks"},"location":{"address":"239 King St","lat":32.78122634,"lng":-79.93341592,"labeledLatLngs":[{"label":"display","lat":32.78122634,"lng":-79.93341592}],"distance":874,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["239 King St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":8051,"usersCount":3000,"tipCount":38},"url":"http:\\/\\/www.starbucks.com\\/","hasMenu":true,"menu":{"type":"Menu","label":"Menu","anchor":"View Menu","url":"https:\\/\\/foursquare.com\\/v\\/starbucks\\/4b5f8468f964a52011bf29e3\\/menu","mobileUrl":"https:\\/\\/foursquare.com\\/v\\/4b5f8468f964a52011bf29e3\\/device_menu"},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"storeId":"8244","referralId":"v-1491406005","venueChains":[{"id":"556f676fbd6a75a99038d8ec"}],"hasPerk":false},{"id":"4b65d556f964a520c7022be3","name":"Marlene and Nathan Addlestone Library, College of Charleston","contact":{"phone":"8439535530","formattedPhone":"(843) 953-5530","twitter":"cofc"},"location":{"address":"205 Calhoun St","lat":32.7842149282925,"lng":-79.93963580270426,"labeledLatLngs":[{"label":"display","lat":32.7842149282925,"lng":-79.93963580270426}],"distance":883,"postalCode":"29424","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["205 Calhoun St","Charleston, SC 29424","United States"]},"categories":[{"id":"4bf58dd8d48988d1a7941735","name":"College Library","pluralName":"College Libraries","shortName":"Library","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/building\\/library_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":12475,"usersCount":1192,"tipCount":33},"venueRatingBlacklisted":true,"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4b56157af964a52092ff27e3","name":"Starbucks","contact":{"phone":"8437229031","formattedPhone":"(843) 722-9031","twitter":"starbucks","facebook":"22092443056","facebookUsername":"Starbucks","facebookName":"Starbucks"},"location":{"address":"475 E Bay St","lat":32.78907333,"lng":-79.93028755,"labeledLatLngs":[{"label":"display","lat":32.78907333,"lng":-79.93028755}],"distance":171,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["475 E Bay St","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":5028,"usersCount":1172,"tipCount":22},"url":"http:\\/\\/www.starbucks.com\\/","hasMenu":true,"menu":{"type":"Menu","label":"Menu","anchor":"View Menu","url":"https:\\/\\/foursquare.com\\/v\\/starbucks\\/4b56157af964a52092ff27e3\\/menu","mobileUrl":"https:\\/\\/foursquare.com\\/v\\/4b56157af964a52092ff27e3\\/device_menu"},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"storeId":"8434","referralId":"v-1491406005","venueChains":[{"id":"556f676fbd6a75a99038d8ec"}],"hasPerk":false},{"id":"52869069498e3289da675936","name":"Starbucks","contact":{"phone":"8437205385","formattedPhone":"(843) 720-5385","twitter":"starbucks","facebook":"22092443056","facebookUsername":"Starbucks","facebookName":"Starbucks"},"location":{"address":"387 King St","lat":32.785895,"lng":-79.936496,"labeledLatLngs":[{"label":"display","lat":32.785895,"lng":-79.936496}],"distance":536,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["387 King St","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":1067,"usersCount":561,"tipCount":3},"url":"http:\\/\\/www.starbucks.com\\/store\\/7015\\/","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"storeId":"14120","referralId":"v-1491406005","venueChains":[{"id":"556f676fbd6a75a99038d8ec"}],"hasPerk":false},{"id":"4b606ac2f964a520b1e429e3","name":"Kudu Coffee & Craft Beer","contact":{"phone":"8438537186","formattedPhone":"(843) 853-7186","twitter":"kuduchs"},"location":{"address":"4 Vanderhorst St","crossStreet":"King St","lat":32.787182076090545,"lng":-79.93772104382515,"labeledLatLngs":[{"label":"display","lat":32.787182076090545,"lng":-79.93772104382515}],"distance":562,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["4 Vanderhorst St (King St)","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":6037,"usersCount":2468,"tipCount":96},"url":"http:\\/\\/www.kuducoffeeandcraftbeer.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4b192e86f964a520d8d823e3","name":"City Lights Coffee","contact":{"phone":"8438537067","formattedPhone":"(843) 853-7067"},"location":{"address":"141 Market St","crossStreet":"btw King & Meeting","lat":32.780651,"lng":-79.932686,"labeledLatLngs":[{"label":"display","lat":32.780651,"lng":-79.932686}],"distance":931,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["141 Market St (btw King & Meeting)","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":2481,"usersCount":1671,"tipCount":43},"url":"http:\\/\\/citylightscoffee.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"5743bcb8498e303426326065","name":"Welkin Coffee","contact":{"facebook":"1060384977346550","facebookUsername":"welkincoffee","facebookName":"Welkin Coffee Charleston"},"location":{"address":"51 S Market St #A","crossStreet":"State","lat":32.78090902558843,"lng":-79.92895216202879,"labeledLatLngs":[{"label":"display","lat":32.78090902558843,"lng":-79.92895216202879}],"distance":948,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["51 S Market St #A (State)","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":139,"usersCount":115,"tipCount":6},"url":"http:\\/\\/welkincoffee.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4b3e6a19f964a520cb9c25e3","name":"Kaminsky\'s","contact":{"phone":"8438538270","formattedPhone":"(843) 853-8270"},"location":{"address":"78 N Market St","lat":32.78100270593765,"lng":-79.93000692215884,"labeledLatLngs":[{"label":"display","lat":32.78100270593765,"lng":-79.93000692215884}],"distance":912,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["78 N Market St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":4790,"usersCount":3333,"tipCount":78},"url":"http:\\/\\/kaminskys.com","hasMenu":true,"menu":{"type":"Menu","label":"Menu","anchor":"View Menu","url":"https:\\/\\/foursquare.com\\/v\\/kaminskys\\/4b3e6a19f964a520cb9c25e3\\/menu","mobileUrl":"https:\\/\\/foursquare.com\\/v\\/4b3e6a19f964a520cb9c25e3\\/device_menu"},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"581a1e7d6a80ef35b07591bc","name":"Revelator Coffee Company","contact":{},"location":{"address":"550 King St","lat":32.792448,"lng":-79.940483,"labeledLatLngs":[{"label":"display","lat":32.792448,"lng":-79.940483}],"distance":871,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["550 King St","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":76,"usersCount":52,"tipCount":2},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"5840abad8d8e996767d28864","name":"Starbucks","contact":{"phone":"8436097036","formattedPhone":"(843) 609-7036","twitter":"starbucks","facebook":"22092443056","facebookUsername":"Starbucks","facebookName":"Starbucks"},"location":{"address":"502 King St","lat":32.79096,"lng":-79.93916,"labeledLatLngs":[{"label":"display","lat":32.79096,"lng":-79.93916}],"distance":694,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["502 King St","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":39,"usersCount":27,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"storeId":"1015872","referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4e9477a7d22dc444beea64d1","name":"Glazed Gourmet Doughnuts","contact":{"phone":"8435775557","formattedPhone":"(843) 577-5557","twitter":"glazedgourmet","facebook":"195729073796085","facebookUsername":"glazedgourmet","facebookName":"Glazed Gourmet Doughnuts"},"location":{"address":"481 King St","lat":32.789498,"lng":-79.938862,"labeledLatLngs":[{"label":"display","lat":32.789498,"lng":-79.938862}],"distance":633,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["481 King St","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d148941735","name":"Donut Shop","pluralName":"Donut Shops","shortName":"Donuts","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/donuts_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":1655,"usersCount":993,"tipCount":47},"url":"http:\\/\\/www.glazedgourmet.com","hasMenu":true,"menu":{"type":"Menu","label":"Menu","anchor":"View Menu","url":"https:\\/\\/foursquare.com\\/v\\/glazed-gourmet-doughnuts\\/4e9477a7d22dc444beea64d1\\/menu","mobileUrl":"https:\\/\\/foursquare.com\\/v\\/4e9477a7d22dc444beea64d1\\/device_menu"},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"venuePage":{"id":"35594737"},"storeId":"","referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"551d7fc3498e23ecd3e053e1","name":"Tricera Coffee","contact":{"twitter":"triceracoffee"},"location":{"address":"41 George St Ste A","crossStreet":"King Street","lat":32.783846,"lng":-79.935565,"labeledLatLngs":[{"label":"display","lat":32.783846,"lng":-79.935565}],"distance":659,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["41 George St Ste A (King Street)","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":248,"usersCount":175,"tipCount":8},"url":"http:\\/\\/triceracoffee.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"56f402e9498e7e44e27cb754","name":"The Rise","contact":{},"location":{"address":"77 Wentworth St","lat":32.782227,"lng":-79.934647,"labeledLatLngs":[{"label":"display","lat":32.782227,"lng":-79.934647}],"distance":791,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["77 Wentworth St","Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":62,"usersCount":52,"tipCount":3},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"5683f6c0498eecea1d8ed68e","name":"java to go","contact":{},"location":{"lat":32.780862,"lng":-79.932442,"labeledLatLngs":[{"label":"display","lat":32.780862,"lng":-79.932442}],"distance":907,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":3,"usersCount":3,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4c226add502b95213cfd6d21","name":"Christophe Artisan Chocolatier","contact":{"phone":"8432978674","formattedPhone":"(843) 297-8674","twitter":"ChristophePaume"},"location":{"address":"90 Society St","crossStreet":"btw Meeting and King","lat":32.785181957022466,"lng":-79.9361801147461,"labeledLatLngs":[{"label":"display","lat":32.785181957022466,"lng":-79.9361801147461}],"distance":571,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["90 Society St (btw Meeting and King)","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1d0941735","name":"Dessert Shop","pluralName":"Dessert Shops","shortName":"Desserts","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/dessert_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":598,"usersCount":401,"tipCount":11},"url":"https:\\/\\/www.christophechocolatier.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"venuePage":{"id":"87378968"},"storeId":"","referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4f806c6ae4b00084da50aef7","name":"Cup - Fine Coffee & Roasters","contact":{"twitter":"cupfinecoffee"},"location":{"address":"331 B-1 Fleming Road","lat":32.786300670744694,"lng":-79.93621499371096,"labeledLatLngs":[{"label":"display","lat":32.786300670744694,"lng":-79.93621499371096}],"distance":487,"postalCode":"29403","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["331 B-1 Fleming Road","Charleston, SC 29403","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":57,"usersCount":13,"tipCount":2},"url":"http:\\/\\/www.cupfinecoffee.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"565c7026498eb40796a56f1f","name":"Starbucks at Marlene and Nathan Addlestone Library","contact":{},"location":{"lat":32.78434277246857,"lng":-79.93936258006357,"labeledLatLngs":[{"label":"display","lat":32.78434277246857,"lng":-79.93936258006357}],"distance":854,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":82,"usersCount":11,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4c5722b1d12a20a1100866bd","name":"Starbucks","contact":{"twitter":"starbucks","facebook":"22092443056","facebookUsername":"Starbucks","facebookName":"Starbucks"},"location":{"address":"290 E Bay St","lat":32.784428,"lng":-79.92863,"labeledLatLngs":[{"label":"display","lat":32.784428,"lng":-79.92863}],"distance":605,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["290 E Bay St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":291,"usersCount":156,"tipCount":3},"url":"http:\\/\\/starbucks.com\\/store-locator\\/store\\/8003","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"storeId":"79296","referralId":"v-1491406005","venueChains":[{"id":"556f676fbd6a75a99038d8ec"}],"hasPerk":false},{"id":"4f4490df19836ed00194ed2a","name":"Claras Coffee Extraordinare and Gift Basket Emporium","contact":{"phone":"8437239845","formattedPhone":"(843) 723-9845"},"location":{"address":"344 King St","lat":32.784663,"lng":-79.935481,"labeledLatLngs":[{"label":"display","lat":32.784663,"lng":-79.935481}],"distance":577,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["344 King St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":0,"usersCount":0,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"565de365498e8b5bcecc200f","name":"Starbucks at Francis Marion Hotel","contact":{},"location":{"lat":32.78546697357502,"lng":-79.93715490982632,"labeledLatLngs":[{"label":"display","lat":32.78546697357502,"lng":-79.93715490982632}],"distance":614,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":14,"usersCount":7,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"56c634e3498e540fcd26b966","name":"sassyass coffee","contact":{},"location":{"lat":32.780056,"lng":-79.933163,"labeledLatLngs":[{"label":"display","lat":32.780056,"lng":-79.933163}],"distance":1001,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":4,"usersCount":4,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4f44cd2b19836ed001969a47","name":"Sea Spray","contact":{"phone":"8437277686","formattedPhone":"(843) 727-7686"},"location":{"address":"360 Concord St","lat":32.790394,"lng":-79.92697,"labeledLatLngs":[{"label":"display","lat":32.790394,"lng":-79.92697}],"distance":505,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["360 Concord St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":0,"usersCount":0,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"4f326ed019836c91c7d74d9b","name":"Port City Java","contact":{"phone":"8435774075","formattedPhone":"(843) 577-4075"},"location":{"address":"372 King St","lat":32.78547,"lng":-79.935893,"labeledLatLngs":[{"label":"display","lat":32.78547,"lng":-79.935893}],"distance":529,"postalCode":"29401","cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["372 King St","Charleston, SC 29401","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":1,"usersCount":1,"tipCount":0},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false},{"id":"57afaa93498e56f85192e68e","name":"Camino Roasters","contact":{},"location":{"lat":32.780981,"lng":-79.928525,"labeledLatLngs":[{"label":"display","lat":32.780981,"lng":-79.928525}],"distance":954,"cc":"US","city":"Charleston","state":"SC","country":"United States","formattedAddress":["Charleston, SC","United States"]},"categories":[{"id":"4bf58dd8d48988d1e0931735","name":"Coffee Shop","pluralName":"Coffee Shops","shortName":"Coffee Shop","icon":{"prefix":"https:\\/\\/ss3.4sqi.net\\/img\\/categories_v2\\/food\\/coffeeshop_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":1,"usersCount":1,"tipCount":1},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1491406005","venueChains":[],"hasPerk":false}]}}',
    headers: {
      server: "nginx",
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "tracer-time": "54",
      "x-ratelimit-path": "/v2/venues/search",
      "x-ratelimit-limit": "5000",
      "x-ratelimit-remaining": "4994",
      "strict-transport-security": "max-age=31536000",
      "x-ex": "fastly_cdn",
      "content-length": "24513",
      "accept-ranges": "bytes",
      date: "Wed, 05 Apr 2017 15:26:45 GMT",
      via: "1.1 varnish",
      connection: "close",
      "x-served-by": "cache-atl6245-ATL",
      "x-cache": "MISS",
      "x-cache-hits": "0",
      vary: "Accept-Encoding,User-Agent,Accept-Language",
    },
    data: {
      meta: {
        code: 200,
        requestId: "58e50cb5db04f53c1b6a5275",
      },
      response: {
        venues: [{}],
      },
    },
  };

  it("should parse venue data from api response", function () {
    const parsedResponse = parseFoursquareResponse(httpTestResponse);

    expect(Array.isArray(parsedResponse)).toBe(true);
    expect(parsedResponse.length).toBe(24);

    expect(parsedResponse[0].id).toEqual("4b5f8468f964a52011bf29e3");
    expect(parsedResponse[0].name).toEqual("Starbucks");

    expect(parsedResponse[5].id).toEqual("4b192e86f964a520d8d823e3");
    expect(parsedResponse[5].name).toEqual("City Lights Coffee");

    expect(parsedResponse[23].id).toEqual("57afaa93498e56f85192e68e");
    expect(parsedResponse[23].name).toEqual("Camino Roasters");
  });
});
