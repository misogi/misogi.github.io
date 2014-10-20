// JavaScript template using Windows Script Host
//タブ譜の中のこの文字を入れ替える。
var tabreplace = [ 'Z' , 'Y' , 'X' , 'W' , 'V' ,  'U'  , 'T' ,  'S' , 'R' , 'Q' , 'P' , 'O'];
var tab = "|V|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-| <br>|O|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-| <br>|S|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-| <br>|X|-W-|-V-|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-| <br>|Q|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-| <br>|V|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-| <br>";
var tab_7str = "|O|-Z-|-Y-|-X-|-W-|-V-|-U-|-T-|-S-|-R-|-Q-|-P-|-O-|-Z-|-Y-|-X-|-W-|-V-| <br>";
var tabnum = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;9&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;11&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;13&nbsp;&nbsp;&nbsp;14&nbsp;&nbsp;&nbsp;15&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;";
//入れ替え後の記号
var scale_base = [ '<span class="tab_on_root">-1</span>' , '--' , '--' , '--' , '--' ,  '--'  , '--' ,  '--' , '--' , '--' , '--' , '--'];
var keyboard_name = ['.key01','.key02','.key03','.key04','.key05','.key06','.key07','.key08','.key09','.key10','.key11','.key12'];

var name_root = ['C' , 'Db' , 'D' , 'Eb' , 'E' , 'F' , 'Gb' , 'G' , 'Ab' , 'A' , 'Bb' , 'B'];
var name_3th = ['' , '' , '' , 'm' , '' , '' , '' , '' , '' , '' , '' , '', '' , ''];
var name_5th = ['' , '' , '' , '' , '' , '' , '(b5)' , '' , '' , '' , '' , '', '' , ''];
var name_7th = ['' , '' , '' , '' , '' , '' , '' , '' , '' , '6' , '7' , 'M7', '' , ''];

var dia_3th = [ '4' , '' ,  '3' , '' ,  '3' , '4' , '' ,  '4' , '' , '3' , '' , '3' ];
var dia_5th = [ '7' , '' ,  '7' , '' ,  '7' , '7' , '' ,  '7' , '' , '7' , '' , '6' ];
var dia_7th = [ '11' , '' ,  '10' , '' ,  '10' , '11' , '' ,  '10' , '' , '10' , '' , '10' ];

var mml_note = [ 'c' , 'c+' , 'd' , 'd+' , 'e' , 'f' , 'f+' , 'g' , 'g+' , 'a' , 'a+' , 'b'];
//----スケール------
var name_scale = [ 'Ionian (Major)' , 'Dorian' , 'Phrygian' , 'Lydian' , 'Mixolydian' , 'Aeolian (Minor)' , 'Locrian' , 'Diminish' , 'Harmonic Minor' , 'Major Pentatonic' , 'Minor Pentatonic' ];
var scale_note = [
	['-r' , '--' , '-2' , '--' , '-3' ,'-4' , '--' , '-5' , '--' , '-6' ,  '--' , '-7'], //Ionian (Major)
	['-r' , '--' , '-2' , 'b3' , '--' ,'-4' , '--' , '-5' , '--' , '-6' ,  'b7' , '--'], //Dorian
	['-r' , 'b2' , '--' , 'b3' , '--' ,'-4' , '--' , '-5' , 'b6' , '--' ,  'b7' , '--'], //Phrygian
	['-r' , '--' , '-2' , '--' , '-3' ,'--' , '#4' , '-5' , '--' , '-6' ,  '--' , '-7'], //Lydian
	['-r' , '--' , '-2' , '--' , '-3' ,'-4' , '--' , '-5' , '--' , '-6' ,  'b7' , '--'], //Mixolydian
	['-r' , '--' , '-2' , 'b3' , '--' ,'-4' , '--' , '-5' , 'b6' , '--' ,  'b7' , '--'], //Aeolian (Minor)
	['-r' , 'b2' , '--' , 'b3' , '--' ,'-4' , 'b5' , '--' , 'b6' , '--' ,  'b7' , '--'], //Locrian
	['-r' , '--' , '-2' , 'b3' , '--' ,'-4' , 'b5' , '--' , 'b6' , '-6' ,  '--' , '-7'], //Diminish
	['-r' , '--' , '-2' , 'b3' , '--' ,'-4' , '--' , '-5' , 'b6' , '--' ,  '--' , '-7'], //Harmonic Minor
	['-r' , '--' , '-2' , '--' , '-3' ,'--' , '--' , '-5' , '--' , '-6' ,  '--' , '--'], //Major Pentatonic
	['-r' , '--' , '--' , 'b3' , '--' ,'-4' , '--' , '-5' , '--' , '--' ,  'b7' , '--'], //Minor Pentatonic
];

//---mml--
var mml,strmml;
JSMML.swfurl = './JSMML.swf';
JSMML.onLoad = function() {
	/* Initialize JSMML */
	mml = new JSMML();
	if (mml === undefined) {
    $('#play').attr('disabled', true)
	}
}

$(function(){
	generateTab();
});

$(function(){
	$("#root").change(function(){
		generateTab();
	});
	
	$("#3th").change(function(){
		generateTab();
	});
	$("#5th").change(function(){
		generateTab();
	});
	$("#7th").change(function(){
		generateTab();
	});
	$("#scale_root").change(function(){
		generateTab();
	});
	$("#scale_scale").change(function(){
		generateTab();
	});
	$("#dia_root").change(function(){
		genDiatonic();
	});
	$("#dia_chord").change(function(){
		selectDiatonic();
		generateTab();
	});
	
    $("#play").click(function(){
        mml.play(strmml);
    }); 
    
    if ($.socialbutton === undefined) {
    	return;
    }
    
    $("#button_mixi").socialbutton('mixi_check', {
        key: 'de2d15e5e48e93f32f74fec731deb56defb7916a'
    });
    $('#button_hatena').socialbutton('hatena', {
        button: '/img/hatena_append.gif'
    });
    $('#button_twitter').socialbutton('twitter');
    $('#button_facebook').socialbutton('facebook_like');
});

function generateTab(){
   	var ind_root = eval( $("#root").val() );
   	var ind_3th = eval( $("#3th").val() );
   	var ind_5th = eval( $("#5th").val() );
   	var ind_7th = eval( $("#7th").val() );
   	var i,ind = 0;
   	var chordname = "";
   	var str = tab;
   	var debug_str = "";
   	var tone_str = "";
   	var scale = scale_base.slice();
   	//3thの音を加える
   	scale[ ind_3th ] = '<span class="tab_on">-3</span>';
   	scale[ ind_5th ] = '<span class="tab_on">-5</span>';
   	scale[ ind_7th ] = '<span class="tab_on">-7</span>';
   	chordname = name_root[ ind_root ] + name_3th[ ind_3th ]+ name_7th[ ind_7th ]+ name_5th[ ind_5th ];
   	for( i = 0 ; i<12 ; i++){
   		ind = ( i + ind_root ) % 12 ;
   		str = str.split( tabreplace[ind] ).join(scale[ i ]);
   		$(keyboard_name[i]).attr({src:"./keyboard_off.gif"});
   	}
   	noteOn(ind_root , 'root');
   	noteOn( (ind_root + ind_3th ) % 12);
   	noteOn( (ind_root + ind_5th ) % 12);
   	tone_str = " (" + name_root[ ind_root ] + " " + name_root[ ( ind_root + ind_3th ) % 12 ] + " " + name_root[ ( ind_root + ind_5th) %12 ] + " ";
   	if(ind_7th != 12){
   		tone_str += name_root[ ( ind_root + ind_7th ) % 12 ] + " ";
   		noteOn( (ind_root + ind_7th ) % 12);
 	}
 	tone_str += ")";
 	strmml = genMmlCode( ind_root , ind_3th , ind_5th , ind_7th );
	//$("#debug").html( genMmlCode( ind_root , ind_3th , ind_5th , ind_7th ) );
 	
  var chord_str = "コード: " + chordname + tone_str;

	$("#chordname").html(chord_str);
	$("#chordresult").html(str);
	$("#tabguide").html(tabnum);
	$("#scaleresult").html(genScale());
	//$("#debug").html( "3:" +  sel_3th.val() );
}

function genDiatonic(){
   	var sel = $("#dia_root");
   	var sel_c = $("#dia_chord");
   	var i;
   	var ind = eval( sel.val() );
	sel_c.empty();
	sel_c.append( $('<option>').val( "0").text( name_root[ (ind + 0) % 12 ] + 'M7' ) );
	sel_c.append( $('<option>').val( "2").text( name_root[ (ind + 2) % 12 ] + 'm7' ) );
	sel_c.append( $('<option>').val( "4").text( name_root[ (ind + 4) % 12 ] + 'm7' ) );
	sel_c.append( $('<option>').val( "5").text( name_root[ (ind + 5) % 12 ] + 'M7' ) );
	sel_c.append( $('<option>').val( "7").text( name_root[ (ind + 7) % 12 ] + '7' ) );
	sel_c.append( $('<option>').val( "9" ).text( name_root[ (ind + 9) % 12 ] + 'm7' ) );
	sel_c.append( $('<option>').val( "11" ).text( name_root[ (ind + 11) % 12 ] + 'm7(b5)') );
}

function selectDiatonic(){
   	var sel = $("#dia_chord");
   	var sel_root = $("#dia_root");
   	var i = eval( sel.val() );
   	var ind = ( i + eval( sel_root.val() ) ) % 12;
	$("#root").val( ind );
	$("#3th").val( dia_3th[ i ] );
	$("#5th").val( dia_5th[ i ] );
	$("#7th").val( dia_7th[ i ] );
}

function noteOn(i, note){
	if(note == 'root'){
		$(keyboard_name[i]).attr({
				src:"./keyboard_note_red.gif"
			});
	}else{
		$(keyboard_name[i]).attr({
				src:"./keyboard_note.gif"
			});
	}
}

function genScale(){
   	var str = tab;
   	var ind_root = eval( $("#scale_root").val() );
   	var ind_scale = eval( $("#scale_scale").val() );
   	var rep;
   	var scalename;
   	for( i = 0 ; i<12 ; i++){
   		ind = ( i + ind_root ) % 12 ;
   		if( scale_note[ ind_scale ][ i ] == '--'){
   			rep = scale_note[ ind_scale ][ i ];
   		}else if( scale_note[ ind_scale ][ i ] == '-r'){
   			rep = '<span class="tab_on_root">' + scale_note[ ind_scale ][ i ] + "</span>";
   		}else{
   			rep = '<span class="tab_on">' + scale_note[ ind_scale ][ i ] + "</span>";
   		}
   		str = str.split( tabreplace[ind] ).join( rep );
   	}

   	scalename = "スケール: " + name_root[ind_root] + " " + name_scale[ind_scale];
  	$("#scalename").html(scalename);
   	return str;
}

function genMmlCode(root, n3th, n5th, n7th){
	var str = "";
	str = "<";
	s1 = mmlNote(root,0);
	s3 = mmlNote(root,n3th);
	s5 = mmlNote(root,n5th);
	s7 = mmlNote(root,n7th);
	str += "@3V14" + s1 + s3 + s5 + s7 ;
	str += "1;\n" + "@3V14 R1" + s3 + "1;\n" + "@3V14 R1" + s5 + "1;\n" + "@3V14 R1" + s7 + "1;\n";
	return str;
}

function mmlNote(root, note){
	var str = "";
	var i = root + note ;
	if(note == 12){
		return "R";
	}
	if(i >= 12){
		i -= 12;
		str = "<" + mml_note[i] + ">" ;
	}else{
		str = mml_note[i];
	}

	return str;
}