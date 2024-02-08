function logincorp(usuario = false, pass = false) {
    console.log(usuario);
    console.log(pass);
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: { base: "corpsanisidrio", param: "login_corp", user: encodeURIComponent(usuario), pass: encodeURIComponent(pass) }
    });
}

function userInfo(){
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corpsanisidrio",param:"getInfo"}
	});
}

function moduleViews(){
	console.log("a")
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corpsanisidrio",param:"getModMain"}
	});
}