$(document).ready(function() {

    $("#bodyPage").load("views/login.html",function(){
        $(function(){
            $("#form_login_corp").submit(function(e){

                var usuario = $("#usuario").val();
                var pass = $("#psw").val();
                //console.log(us+" - "+pass);
                $("#btnSubmit").text("");
                //$("#btnSubmit").append('<div id="contenedor" align="center"><div id="loader" class="spinner-border" align="center"></div></div>');
                $("#btnSubmit").html("Ingresando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
                $("#btnSubmit").attr('disabled', true);
        

                if(usuario.includes('-') || usuario.includes('@') || usuario.includes(' ')|| usuario.includes('´') ){
                    alert("Datos Incorrectos") 
                }else{
					logincorp(usuario, pass)
					.done(function(response) {
						console.log("Respuesta exitosa:", response);
						if (response['code'] == 200 && response["response"]["data"] != false) {
							console.log("Entro a viewPrincipal()");
							viewPrincipal();
						} else {
							alert("Error de usuario y contraseña");
						}
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
						console.log("Detalles del error:", jqXHR.responseText);
					});
                e.preventDefault();
            }
                
            })
        });
    });


});


function viewPrincipal(){
    $("#modalNotify").load("views/modalIngreso.html");
	let user, modules, news;
	user = userInfo();
	modules = moduleViews();

	$.when(user,modules).done(function(responseInfo,responseMod){
		$("#bodyPage").animate({opacity:0},"slow",function(){
            console.log(responseInfo,responseMod)
			let tag = "#bodyPage";
			$(tag).children().remove();
			$(tag).css("opacity",50);
            loadView(responseInfo[0]["response"],responseMod[0]["response"]);
			
		});

	}).fail(function(response){
		console.log("fail...");
		console.log(response);
	});
}

function loadView(info,modules){
	$("body").addClass('animated zoomIn slower');
	$("#bodyPage").load("views/mainView2.html",function(){
	
		$("#modalView").load("views/modalClose.html");
        $("#cardInfo").find("#name").text(info[0]["NOMBRE"] +' '+info[0]["APELLIDOS"]);
		var modulos = "";
        $.each(modules, function(index, val) {
			counterNews = 0;
			stringData = "";
		
            imageModule = "data:image/jpeg;base64,"+val['photo'];
         
			$("#cardModules").find(".bodyCard").append("<div class='col-lg-3 col-md-4 col-xs-6 text-center pulse'>" +
				"<a href='"+val['path']+"' target='_blank' class='d-block mb-4 h-100'>" +
				"<div class='row d-flex p-2 justify-content-center'>" +
				"<span class='w-75 text-center text-xl'>"+val['module']+" </span>" +
				"</div>" +
				"<img class=' img-fluid img-thumbnail  w-75 h-75 border ' src='"+imageModule+"' alt=''>" +
				"</a>" +
				"</div>")


	
		});
	

	
	

		$("#filter").off("keyup");
		$("#filter").keyup(function(e){
			filterModules($(this).val());
		});
	});
}


function filterModules(filter){
	var hide;
	var show;
	if (filter != "") {
		filter = filter[0].toUpperCase() + filter.slice(1);
	}
	$.each($("#cardModules").find("a"), function(index, val) {
		if($(this).find("span").text().indexOf(filter) == -1){
			var tag = this;
			$(this).parent().removeClass("animated zoomIn slower");
			$(this).parent().addClass("animated zoomOut slower");
			hide = setTimeout(function(){
				$(tag).parent().addClass("d-none");
				//clearTimeout(time);
			},1000);
		}
		else{
			var tag = this;
			$(this).parent().removeClass("animated zoomOut slower d-none");
			$(this).parent().addClass("animated zoomIn slower");
			show = setTimeout(function(){
				$(tag).parent().removeClass("animated zoomIn slower");
				//clearTimeout(show);
			},1000);
		}
	});	
	$("#cardModule").stop();
}
