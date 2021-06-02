//= ../libs/jquery.js
//= ../../node_modules/foundation-sites/dist/js/foundation.min.js
//= ajaxEmailSender.js
//= ../libs/jquery.validate.js


$(document).foundation();
$(document).ready(function() {
 
var e = $('.menu');
    
    e.find('a').click(function(){
        var but = $(this).parent();
        but.addClass('is-active');
        but.siblings().removeClass('is-active');
	 });

	 $(window).scroll(function(){
		var sticky =  $('.sticky');
		var totopbutton = $('.scroll');
		totopbutton.css('opacity', 0);
		
		var windowScroll = $(this).scrollTop();
		
		 if (windowScroll >= 200){
			sticky.addClass('stickyshadow');
			totopbutton.css('opacity', 1);
		 }
		 else {
			sticky.removeClass('stickyshadow');
			totopbutton.css('opacity', 0);
		 }
	 });

	
	 var country = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	 ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	 ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	 ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	 ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	 ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	 ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	 ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	 ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	 ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	 ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	 ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	 ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	 ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
	 ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	 var count_country = country.length;
	 
	 for (var i=0; i<count_country; i++){
		 var c = country[i];
		 var option = '<option value="'+c+'">'+c+'</option>';
		$('#country').append(option);
	 }
	 var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	 var count_month = month.length;
	 
	 for (var i=0; i<count_month; i++){
		 var c = month[i];
		 var option = '<option value="'+c+'">'+c+'</option>';
		$('#month').append(option);
	 }

	 var year = ["2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029"];
	 var count_year = year.length;
	 
	 for (var i=0; i<count_year; i++){
		 var c = year[i];
		 var option = '<option value="'+c+'">'+c+'</option>';
		$('#year').append(option);
	 }

});


$(window).bind('resize load',function(){
	var c = $(this).width();
	if (c<640){
			$('#example-menu').addClass('mobile-version');
	}
	else {
		$('#example-menu').removeClass('mobile-version');
	}
});

$('.menu-icon').click(function(e){
	e.stopPropagation();
});

$('body').click(function(){
	$('.mobile-version').css('display','none');
});

$(window).resize(function(){
	calculateHeightBlock();
});



function calculateHeightBlock() {
	var heightImg = $('.about-us-tiles__picture img').height();
	var heightBlock = heightImg*2;
	
	$('.about-us-tiles__block').css('height', heightBlock+'px');
}

calculateHeightBlock();
