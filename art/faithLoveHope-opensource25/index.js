/*
@title: faithLoveHope
@author: opensource25
@snapshot: snapshot1.png
*/

// you can change this to your preferences
var colorOptions = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

const backgroundColor = selectColor(); // symbol nice look: "White"
const backgroundLineCount = bt.randIntInRange(5, 10); //symbol nice look: 0
function backgroundLineSteps(){return bt.randIntInRange(5, 50);}
function backgroundLineWidth(){return bt.randIntInRange(2, 5);}
function backgroundLineColor(){return selectColor();}
function backgroundLineHorizontalStepRange(){return bt.randIntInRange(2, 10);}
function backgroundLineVerticalStepRange(){return bt.randIntInRange(-5, 5);}

const crossFillColor = selectColor(); // symbol nice look: "Black"
const heartFillColor = selectColor(); // symbol nice look: "Red"
const anchorFillColor = selectColor(); // symbol nice look: "Navy"

const crossStrokeColor = selectColor(); // symbol nice look: "Black"
const heartStrokeColor = selectColor(); // symbol nice look: "Red"
const anchorStrokeColor = selectColor(); // symbol nice look: "Navy"

const crossLineWidth =  bt.randIntInRange(0,3); // symbol nice look: 1
const heartLineWidth = bt.randIntInRange(0,3); // symbol nice look: 1
const anchorLineWidth = bt.randIntInRange(0,3); // symbol nice look: 1


// you could change this, but you probably shouldn't/doesn't want to
const crossWidth = 5
const borderOffset = 1
const heightHeart = 32.5 + borderOffset
const heightCross = 45 + borderOffset
const heightAnchor = 45 + borderOffset

const width = 62.5;
const height = 125;
setDocDimensions(width, height);

function selectColor(){
  const randInt = bt.randIntInRange(0,147)
  const color = colorOptions[randInt]
  colorOptions.splice(randInt, 1)
  return color
}

function drawBackground(){
  const fillBackground = [[0, 0], [width, 0], [width, height], [0, height], [0,0]];
  drawLines([fillBackground], { fill: backgroundColor});
  for (let i = 0; i < backgroundLineCount; i++){
    const steps = []
    for (let j = 0; j < backgroundLineSteps(); j++){
      if (steps.length <= 0){
        const x = backgroundLineHorizontalStepRange();
        const y = backgroundLineVerticalStepRange();
        steps.push([x, y]);
      }
      else {
        const lastStep = steps[steps.length - 1]
        const x = lastStep[0] + backgroundLineHorizontalStepRange();
        const y = lastStep[1] + backgroundLineVerticalStepRange();
        steps.push([x, y]);
      }
    }
    const line = [bt.catmullRom(steps, 100)];
    bt.rotate(line, bt.randIntInRange(1,170))
    bt.translate(line, [bt.randIntInRange(1, width/8), bt.randIntInRange(1, height)])
    drawLines(line, { stroke:backgroundLineColor(), width: backgroundLineWidth() })
  }
}

function generateHeart(){
  const turtle = new bt.Turtle()

  //left
  turtle.left(140)
  turtle.forward(111)
  for (let i = 0; i < 200; i++){
    turtle.right(1)
    turtle.forward(1)
  }

  //right
  turtle.left(120)
  for (let i = 0; i < 200; i++){
    turtle.right(1)
    turtle.forward(1)
  }
  turtle.forward(111.65)
  
  return turtle.path
}

function generateCrosss(){
  const cross = [
    //left
    [width/2-crossWidth/2, 0],  
    [width/2-crossWidth/2, crossWidth*5.5], 
    [width/2-crossWidth*3, crossWidth*5.5], 
    [width/2-crossWidth*3, crossWidth*6.5], 
    [width/2-crossWidth/2, crossWidth*6.5], 
    [width/2-crossWidth/2, crossWidth*9],
    //right 
    [width/2+crossWidth/2, crossWidth*9], 
    [width/2+crossWidth/2, crossWidth*6.5], 
    [width/2+crossWidth*3, crossWidth*6.5],  
    [width/2+crossWidth*3, crossWidth*5.5],
    [width/2+crossWidth/2, crossWidth*5.5],
    [width/2+crossWidth/2, 0],  
    //close
    [width/2-crossWidth/2, 0]];
  return [cross]
}

function generateAnchor(){
  // modelled in inkscape
  const anchor = [[91.0833,0.00017],[90.85043432617186,8.487433776855468],[90.61517773437498,16.97552083984375],[90.49554093627927,21.219776181335448],[90.3739721191406,25.464121037597657],[90.25002651977539,29.708516639709472],[90.12325937499999,33.95292421875],[89.99322592163085,38.19730500579834],[89.85948139648437,42.44162023193359],[89.72158103637693,46.68583112823486],[89.57908007812499,50.929898925781245],[89.4315337585449,55.17378485565185],[89.27849731445312,59.41745014892579],[89.119525982666,63.660856036682134],[88.95417499999999,67.90396375],[88.78199960327147,72.14673451995849],[88.60255502929687,76.38912957763671],[88.41539651489258,80.63111015411377],[88.22007929687499,84.87263748046874],[88.01615861206052,89.11367278778076],[87.8031896972656,93.3541773071289],[87.58072778930662,97.59411226959227],[87.348328125,101.83343890625],[87.10554594116209,106.07211844818116],[86.85193647460935,110.31011212646484],[86.58705496215818,114.54738117218017],[86.31045664062498,118.78388681640625],[86.02169674682617,123.01959029022217],[85.7203305175781,127.25445282470703],[85.40591318969724,131.48843565093992],[85.07799999999999,135.7215],[84.99546333618163,136.42354852600099],[84.93135942382811,137.15276516113283],[84.88245363159177,137.90498149108888],[84.84551132812499,138.6760291015625],[84.81729788208007,139.46173957824706],[84.79457866210937,140.25794450683594],[84.77411903686522,141.06047547302245],[84.75268437499999,141.86516406249999],[84.727040045166,142.66784186096191],[84.69395141601562,143.46434045410155],[84.65018385620117,144.25049142761227],[84.59250273437499,145.02212636718747],[84.51767341918944,145.7750768585205],[84.42246127929685,146.50517448730469],[84.30363168334958,147.2082508392334],[84.15794999999999,147.8801375],[83.9821815979004,148.51666605529783],[83.77309184570312,149.1136680908203],[83.52744611206055,149.66697519226074],[83.242009765625,150.1724189453125],[82.91354817504882,150.62583093566894],[82.53882670898437,151.02304274902343],[82.11461073608397,151.35988597106933],[81.63766562499998,151.63219218749998],[81.10475674438474,151.83579298400878],[80.51264946289061,151.96651994628905],[79.8581091491699,152.02020466003418],[79.13790117187499,151.9926787109375],[78.3487908996582,151.8797736846924],[77.48754370117187,151.6773211669922],[76.55092494506836,151.38115274353027],[75.53569999999999,150.9871],[74.00830363464354,150.38409107666018],[72.49514743652344,149.75118681640626],[70.99633700256348,149.0889647338867],[69.51197792968749,148.39800234375002],[68.04217581481933,147.67887716064456],[66.5870362548828,146.93216669921878],[65.14666484680174,146.15844847412114],[63.721167187499994,145.3583],[62.310648873901364,144.53229879150393],[60.915215502929684,143.68102236328127],[59.53497267150878,142.80504822998046],[58.17002597656249,141.90495390625],[56.820481015014636,140.9813169067383],[55.48644338378905,140.03471474609375],[54.168018679809556,139.06572493896488],[52.86531249999999,138.074925],[51.57843044128417,137.06289244384766],[50.307478100585925,136.03020478515626],[49.05256107482909,134.97743953857423],[47.81378496093749,133.90517421875],[46.591255355834946,132.813986340332],[45.38507785644531,131.70445341796875],[44.195358059692374,130.57715296630857],[43.02220156249999,129.4326625],[41.86571396179198,128.2715595336914],[40.72600085449218,127.09442158203125],[39.60316783752441,125.90182615966796],[38.49732050781249,124.69435078125],[37.40856446228026,123.47257296142578],[36.33700529785155,122.23707021484374],[35.28274861145019,120.98842005615232],[34.24589999999999,119.7272],[52.77949999999999,115.8631],[51.558905142211906,114.94999855804443],[50.326429028320305,114.05453854248047],[49.08238434753417,113.17648829376222],[47.8270837890625,112.31561615234375],[46.56084004211425,111.4716904586792],[45.28396579589844,110.64447955322267],[43.996773739624025,109.83375177642824],[42.6995765625,109.03927546875002],[41.39268695373535,108.2608189706421],[40.07641760253907,107.49815062255861],[38.75108119812012,106.75103876495363],[37.4169904296875,106.01925173828127],[36.0744579864502,105.30255788299563],[34.723796557617185,104.6007255395508],[33.365318832397456,103.91352304840089],[31.9993375,103.24071875],[30.626165249633793,102.58208098480225],[29.246114770507816,101.93737809326171],[27.859498751831058,101.30637841583251],[26.4666298828125,100.68885029296875],[25.067820852661132,100.08456206512452],[23.663384350585936,99.4932820727539],[22.253633065795896,98.91477865631103],[20.8388796875,98.34882015625],[19.41943690490723,97.79517491302491],[17.99561740722656,97.25361126708985],[16.567733883666993,96.72389755889893],[15.1360990234375,96.20580212890624],[13.701025515747071,95.69909331756591],[12.262826049804687,95.20353946533203],[10.821813314819334,94.71890891265869],[9.3783,94.24497],[8.924838873291016,95.64114811614989],[8.481179345703126,97.04062020263672],[8.047375946044923,98.4433106790161],[7.623483203125,99.84914396484373],[7.209555645751953,101.25804447967528],[6.8056478027343745,102.66993664306639],[6.411814202880859,104.08474487457273],[6.028109375,105.50239359374999],[5.654587847900391,106.9228072201538],[5.291304150390625,108.34591017333983],[4.938312811279297,109.77162687286375],[4.595668359375,111.19988173828123],[4.263425323486328,112.63059918914794],[3.941638232421875,114.06370364501952],[3.630361614990234,115.49911952545165],[3.32965,116.93677124999999],[3.0395579162597657,118.3765832382202],[2.7601398925781253,119.81847990966796],[2.491450457763672,121.26238568389891],[2.233544140625,122.70822498046874],[1.9864754699707028,124.15592221893311],[1.750298974609375,125.60540181884767],[1.525069183349609,127.05658819976807],[1.310840625,128.50940578125],[1.1076678283691406,129.96377898284913],[0.915605322265625,131.4196322241211],[0.7347076354980469,132.8768899246216],[0.5650292968749999,134.33547650390625],[0.4066248352050781,135.79531638153077],[0.259548779296875,137.25633397705076],[0.12385565795898437,138.71845371002195],[-0.0004,140.1816],[15.4705,128.1016],[16.65095163574219,131.24397560729977],[17.9507826171875,134.32942282714845],[19.36664768066406,137.35572225646973],[20.8952015625,140.3206544921875],[22.533098999023437,143.2220001312256],[24.2769947265625,146.05753977050784],[26.123543481445314,148.82505400695803],[28.0694,151.5223234375],[30.11121901855469,154.1471286590576],[32.2456552734375,156.69725026855468],[34.46936350097656,159.17046886291502],[36.7789984375,161.5645650390625],[39.171214819335944,163.8773193939209],[41.642667382812505,166.10651252441406],[44.190010864257815,168.24992502746582],[46.8099,170.3053375],[49.49898952636719,172.27053053894045],[52.253934179687505,174.14328474121095],[55.07138869628906,175.92138070373534],[57.948007812499995,177.6025990234375],[60.88044626464843,179.18472029724123],[63.86535878906248,180.6655251220703],[66.8994001220703,182.0427940948486],[69.97922499999999,183.31430781249998],[73.10148815917967,184.47784687194823],[76.26284433593749,185.53119187011717],[79.45994826660156,186.47212340393065],[82.68945468749999,187.29842207031248],[85.94801833496092,188.00786846618652],[89.23229394531249,188.59824318847654],[92.53893625488281,189.06732683410644],[95.8646,189.41289999999998],[97.63862117614747,189.46511445007323],[99.41209323730469,189.4742613037109],[101.18441960754394,189.44103019104],[102.95500371093749,189.36611074218746],[104.72324897155761,189.25019258728025],[106.48855881347656,189.09396535644527],[108.2503366607666,188.89811867980956],[110.0079859375,188.66334218749998],[111.76091006774902,188.39032550964356],[113.50851247558592,188.0797582763672],[115.25019658508299,187.73233011779783],[116.9853658203125,187.3487306640625],[118.71342360534668,186.92964954528807],[120.4337733642578,186.47577639160156],[122.14581852111814,185.98780083312988],[123.8489625,185.4664125],[125.54260872497558,184.91230102233888],[127.22616062011717,184.32615603027344],[128.89902160949703,183.70866715393066],[130.5605951171875,183.0605240234375],[132.21028456726077,182.3824162689209],[133.84749338378907,181.67503352050778],[135.47162499084473,180.93906540832518],[137.0820828125,180.17520156249998],[138.67827027282715,179.38413161315913],[140.25959079589842,178.56654519042962],[141.82544780578613,177.7231319244384],[143.3752447265625,176.85458144531248],[144.90838498229982,175.96158338317866],[146.42427199707032,175.04482736816402],[147.92230919494628,174.1050030303955],[149.4019,173.14279999999997],[150.88573943481447,172.1026387481689],[152.34962172851564,171.03396975097655],[153.79305223999023,169.937274520874],[155.215536328125,168.81303457031248],[156.61657935180665,167.66173141174315],[157.9956866699219,166.48384655761717],[159.35236364135744,165.27986152038574],[160.686115625,164.05025781249998],[161.99644797973633,162.7955169464111],[163.28286606445312,161.51612043457027],[164.5448752380371,160.21254978942866],[165.78198085937498,158.88528652343746],[166.9936882873535,157.5348121490478],[168.1795028808594,156.16160817871088],[169.3389299987793,154.76615612487788],[170.471475,153.34893749999995],[171.5766432434082,151.91043381652827],[172.65394008789065,150.45112658691403],[173.702870892334,148.9714973236084],[174.722941015625,147.47202753906248],[175.71365581665037,145.9531987457275],[176.67452065429688,144.41549245605466],[177.6050408874512,142.85939018249508],[178.504721875,141.28537343749997],[179.37306897583008,139.69392373352048],[180.2095875488281,138.0855225830078],[181.01378295288086,136.46065149841306],[181.785160546875,134.81979199218745],[182.52322568969726,133.1634255767822],[183.22748374023436,131.4920337646484],[183.89744005737305,129.80609806823725],[184.5326,128.10609999999997],[199.99960000000002,140.18109999999996],[199.87533495788574,138.71796309112545],[199.73963239746092,137.25585277587888],[199.59254679260255,135.79484467132568],[199.43413261718752,134.33501439453124],[199.26444434509278,132.87643756256102],[199.08353645019534,131.41918979248044],[198.8914634063721,129.96334670135494],[198.68827968750003,128.50898390624997],[198.47403976745608,127.05617702423092],[198.2487981201172,125.60500167236324],[198.01260921936034,124.15553346771236],[197.76552753906248,122.70784802734372],[197.50760755310054,121.26202096832273],[197.23890373535156,119.81812790771481],[196.95947055969236,118.37624446258542],[196.6693625,116.93644624999996],[196.36863403015138,115.49880888702387],[196.05733962402346,114.06340799072261],[195.7355337554932,112.63031917816157],[195.40327089843754,111.19961806640622],[195.0606055267334,109.77138027252195],[194.70759211425784,108.3456814135742],[194.34428513488768,106.92259710662839],[193.9707390625,105.50220296874997],[193.5870083709717,104.08457461700436],[193.19314753417967,102.66978766845699],[192.78921102600094,101.2579177401733],[192.37525332031248,99.8490404492187],[191.9513288909912,98.44323141265865],[191.51749221191403,97.04056624755854],[191.073797756958,95.64112057098384],[190.62030000000001,94.24496999999997],[189.17678668518067,94.71890896942136],[187.73577395019532,95.20353968505856],[186.29757448425295,95.69909379547116],[184.8625009765625,96.20580294921872],[183.43086611633302,96.72389879486082],[182.00298259277346,97.253612980957],[180.57916309509278,97.79517715606687],[179.15972031250004,98.34882296874997],[177.74496693420417,98.91478206756588],[176.33521564941412,99.49328610107418],[174.9307791473389,100.08456671783443],[173.53197011718754,100.6888555664062],[172.13910124816897,101.30638429534909],[170.7524852294922,101.93738455322261],[169.37243475036624,102.5820879885864],[167.99926250000001,103.24072624999997],[166.63328116760258,103.91353098602292],[165.27480344238285,104.6007338452148],[163.92414201354984,105.30256647613521],[162.58160957031254,106.0192605273437],[161.2475188018799,106.75104764739984],[159.92218239746097,107.49815948486324],[158.60591304626467,108.26082768829342],[157.29902343750004,109.03928390624996],[156.00182626037605,109.83375978729244],[154.71463420410163,110.64448697998043],[153.4377599578858,111.47169713287349],[152.1715162109375,112.3156218945312],[150.91621565246584,113.17649291351313],[149.6721709716797,114.05454183837887],[148.43969485778808,114.95000031768797],[147.21910000000003,115.86309999999997],[165.75420000000003,119.72719999999997],[164.56800756225587,121.16636146240232],[163.35853432617188,122.58956982421871],[162.1259926574707,123.99591417236323],[160.870594921875,125.38448359374995],[159.59255348510743,126.75436717529291],[158.29208071289065,128.1046540039062],[156.9693889709473,129.43443316650388],[155.62469062500003,130.74279374999995],[154.2581980407715,132.02882484130856],[152.8701235839844,133.2916155273437],[151.46067962036136,134.53025489501948],[150.03007851562506,135.74383203124995],[148.5785326354981,136.93143602294919],[147.10625434570318,138.0921559570312],[145.61345601196294,139.2250809204101],[144.10035000000005,140.32929999999996],[142.56714867553714,141.4039022827148],[141.0140644042969,142.4479768554687],[139.441309552002,143.46061280517574],[137.84909648437502,144.44089921874996],[136.23763756713868,145.38792518310544],[134.60714516601564,146.30077978515624],[132.95783164672855,147.17855211181637],[131.28990937500004,148.02033124999997],[129.6035907165528,148.82520628662104],[127.89908803710942,149.5922663085937],[126.17661370239263,150.32060040283199],[124.43638007812504,151.00929765624997],[122.67859953002933,151.6574471557617],[120.90348442382815,152.26413798828122],[119.11124712524415,152.82845924072262],[117.30210000000002,153.34949999999998],[116.85936845397951,150.49106511260982],[116.44458903808597,147.62983668212888],[116.05650958557132,144.76594780609128],[115.69387792968752,141.89953158203122],[115.35544190368654,139.03072110748286],[115.03994934082033,136.15964947998043],[114.74614807434084,133.28644979705805],[114.47278593750002,130.41125515624998],[114.21861076354982,127.53419865509032],[113.9823703857422,124.65541339111327],[113.76281263732912,121.77503246185302],[113.5586853515625,118.89318896484374],[113.36873636169435,116.01001599761963],[113.19171350097658,113.12564665771484],[113.02636460266115,110.24021404266357],[112.87143750000001,107.35385124999999],[112.72568002624514,104.46669137725829],[112.58784001464846,101.57886752197265],[112.45666529846193,98.69051278167723],[112.33090371093752,95.80176025390624],[112.20930308532715,92.91274303619383],[112.09061125488282,90.02359422607421],[111.85694531250002,84.24543421874998],[111.73946686706545,81.35668921661374],[111.6198885498047,78.46834501220701],[111.49695819396975,75.58053470306395],[111.36942363281253,72.69339138671873],[111.236032699585,69.80704816070553],[111.0955332275391,66.92163812255858],[110.94667304992679,64.037294369812],[110.78820000000002,61.15414999999997],[110.63457419433595,57.33302292968747],[110.48409824218751,53.51176296874997],[110.33690559082032,49.69037011718747],[110.19312968750003,45.868844374999966],[110.05290397949223,42.047185742187466],[109.91636191406253,38.22539421874997],[109.78363693847659,34.40346980468747],[109.65486250000002,30.58141249999997],[109.53017204589845,26.75922230468747],[109.40969902343751,22.93689921874997],[109.29357687988282,19.11444324218747],[109.18193906250002,15.291854374999973],[109.0749190185547,11.469132617187475],[108.97265019531251,7.646277968749975],[108.87526604003908,3.8232904296874755],[108.78290000000001,0.00016999999997580062],[106.5704376953125,-0.0021145703125241993],[104.35797656250001,-0.001812812500024199],[99.9330625,0.002682499999975801],[95.5081671875,0.005921562499975801],[93.2957294921875,0.004653007812475801],[91.08330000000001,0.00016999999997580062],[91.0833,0.00017]]
  return [anchor]  
}



drawBackground();

const cross = generateCrosss();
bt.translate(cross, [0, heightAnchor+heightHeart])
drawLines(cross, { fill: crossFillColor, stroke:crossStrokeColor, width: crossLineWidth });

const anchor = generateAnchor();
const smallAnchor = bt.iteratePoints(anchor, (pt, t) => {
  const [x, y] = pt;
  return [x*0.25, y*0.25];
});
bt.rotate(anchor, 180);
bt.translate(smallAnchor, [6.25, borderOffset]);
drawLines(anchor, { fill: anchorFillColor, stroke:anchorStrokeColor, width: anchorLineWidth });

const heart = generateHeart();
const smallHeart = bt.iteratePoints(heart, (pt, t) => {
  const [x, y] = pt;
  return [x*0.25, y*0.25];
});
bt.translate(smallHeart, [width/2, heightAnchor]);
drawLines(smallHeart, { fill: heartFillColor, stroke:heartStrokeColor, width: heartLineWidth });