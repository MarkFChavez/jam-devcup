$(document).ready(function(){
	$("#inputPassword3-2").change(function(){
		validatePass();
	});
	$("#inputPassword3").change(function(){
		validatePass();
	});

	$('.deleteAccount').click(function(){
		var redirect = $('.deleteAccount').val();
		$('#deleteModal').modal('show');
		return false;
	});
	$('#deleteButton').click(function(){
		window.location = $('.deleteAccount').val();
	});
	var pathname = window.location.pathname;
	var location = pathname.split("/");
	var address = location[2].split(".");

	if(pathname == "/delivery/"+address[0]+".php") {
		$('#'+address[0]).addClass('active');
		$('#'+address[0]).parent().parent().addClass('active');
	}

	$('button[data-dismiss="modal"]').click(function(){
		$(this).parent().parent().parent().removeAttr('action');
		$('#newCategory').val("");
	});

	$('.editCat').click(function(){
		var category = $(this).val();
		var catArray = category.split('-');
		$("#categoryEdit form").attr("action", "db.php?editcat="+catArray[1]+"&catName="+catArray[0]);
		$("#newCategory").val(catArray[0]);
	});

	$('#deleteCategoryButton').click(function(){
		var category = $(this).val();
		var catArray = category.split('-');
		$("#categoryDelete form").attr("action", "db.php?delcat="+catArray[1]+"&catName="+catArray[0]);
	});

	$('#deleteBranchButton').click(function(){
		var category = $(this).val();
		var catArray = category.split('-');
		$("#branchDelete form").attr("action", "db.php?delbranch="+catArray[1]+"&catName="+catArray[0]);
	});


	$('.editMenu').click(function(){
		var menu = $(this).val();
		var menuArray = menu.split('_');
		var imgJPG = $('img.img'+menuArray[2]).attr("src");
		var cat = $('.category'+menuArray[1]).val();
		$("#menuEdit form").attr("action", "db.php?editmenu="+menuArray[1]+"&menuName="+menuArray[0]+"&menu_ref="+menuArray[2]);
		$("#newMenu").val(menuArray[0]);
		$("#oldMenuName").val(menuArray[0]);
		$(".newCat").text(cat);
		$(".oldImage").attr("src", imgJPG);
		$("#oldImageHidden").val(imgJPG);
		$("#menu_ref").val(menuArray[2]);
		$("#price").val(menuArray[3]);
	});

	$('#deleteMenuButton').click(function(){
		var menu = $(this).val();
		var menuArray = menu.split('+');
		$("#menuDelete form").attr("action", "db.php?delmenu="+menuArray[1]+"&menuName="+menuArray[0]+"&menu_ref="+menuArray[2]);
	});

	$('body').on('click','.addItem', function(){
		var array_val = $(this).val();
		var item = array_val.split('+');
		var price = item['3']*item['2'];
		var ref = item['0'];
		var resto_ref = item['4'];
		var total = 0;

		if($('.ref-'+ref).val()){
			var qty = parseInt($('.qty-'+ref).text()) + 1;
			price = qty * parseFloat(price); 
			$('.qty-'+ref).text(qty);
			$('.price-'+ref).text(price+'.00');
			$('.ref-'+ref).val(price+'+'+1+'+'+item['1']+'+'+ref+'+'+resto_ref);
		}else{
			$('.itemSummary table').append('<tr class="row-'+ref+'"><td class="qty qty-'+ref+'">1</td><td>'+item['1']+'</td><td class="price price-'+ref+'" align="right">'+price+'.00</td></tr><tr class="row-'+ref+'"><td colspan=3 align=right><button href=# class="btn btn-default addItem" role="button" value="'+array_val+'"><i class = "fa fa-plus"></i></button><button href=# class="btn btn-default removeItem" role="button" value="'+array_val+'"><i class = "fa fa-minus"></i></button></td></tr>');
			$('.hiddenpricescontainer').append('<input type="hidden" value="'+price+'+'+1+'+'+item['1']+'+'+ref+'+'+resto_ref+'" class="hiddenprices ref-'+ref+'"  name="purchasedItems[]">');
		}
		$('input.hiddenprices').each(function(){
			total = parseFloat($(this).val()) + total;
			$('.total').text(total.toFixed(2));
			$('.ref-'+ref).val(price+'+'+1+'+'+item['1']+'+'+ref+'+'+resto_ref+'+'+total);

		});
	});

	$('body').on('click','.removeItem', function(){
		var array_val = $(this).val();
		var item = array_val.split('+');
		var price = item['3']*item['2'];
		var ref = item['0'];
		var resto_ref = item['4'];
		var total = 0;

		if($('.ref-'+ref).val()){
			if($('.qty-'+ref).text() == 1){
				$('.row-'+ref).remove();
				$('.ref-'+ref).remove();
				$('.total').text('0');

			}else{
				var qty = parseInt($('.qty-'+ref).text()) - 1;
				price = qty * parseFloat(item['2']); 
				$('.qty-'+ref).text(qty);
				$('.price-'+ref).text('PhP '+price+'.00');
				$('.ref-'+ref).val(price+'+'+1+'+'+item['1']+'+'+ref+'+'+resto_ref);
			}
		}
		$('input.hiddenprices').each(function(){
			var hiddenItems = $(this).val();
			var prices = hiddenItems.split('+');
			total = parseFloat(prices[0]) + total;
			$('.total').text(total.toFixed(2));
			$('.ref-'+ref).val(price+'+'+1+'+'+item['1']+'+'+ref+'+'+resto_ref+'+'+total);

		});
	});

	


});
function validatePass () {
	var pass1 = $("#inputPassword3").val();
	var pass2 = $("#inputPassword3-2").val();
	if(pass1 == pass2){
		$('button[type="submit"]').removeAttr('disabled');
		$(".noMatch").removeClass("error");
		return true;
	}else{
		$(".noMatch").addClass("error");
		$('button[type="submit"]').attr('disabled', 'disabled');
		return	false;
	}
}

function getFile(){
        document.getElementById("file").click();
    }

function sub(obj){
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById("upload").innerHTML = fileName[fileName.length-1];
    document.myForm.submit();
    
    event.preventDefault();
  }
  $(function() {
    var availableTags = [
      "Alaminos City","Angeles City","Antipolo City","Bacolod City","Bago City","Baguio City","Bais City","Balanga City","Batangas City","Bayawan City","Bisilig City","Butuan City","Cabanatuan City","Cadiz City","Cagayan de Oro City","Calamba City","Calapan City","Calbayog City","Caloocan City","Candon City","Canlaon City","Cauayan City","Cavite City","Cebu City","Cotabato City","Dagupan City","Danao City","Dapitan City","Davao City","Digos City","Dipolog City","Dumaguete City","Escalante City","Gapan City","General Santos City","Gingoog City","Himamaylan City","Iligan City","Iloilo City","Iriga City", "Isabela City","Island Garden City of Samal","Kabankalan City","Kidapawan City","Koronadal City","La Carlota City","Laoag City","Lapu-Lapu City","Las Pi\u00f1as City","Legazpi City","Ligao City","Lipa City","Lucena City","Maasin City","Makati City","Malabon City","Malaybalay City","Malolos City","Malolos City","Mandaluyong City","Mandaue City","Manila","Maragondon","Marawi City","Masbate City","Muntinlupa City","Naga City","Olongapo City","Ormoc City","Oroquieta City","Ozamis City","Pagadian City","Palayan City","Legazpi City","Para\u00f1aque City","Pasay City","Pasig City","Passi City","Puerto Princesa City","Quezon City","Roxas City","Sagay City","San Carlos City, Negros Occidental","San Carlos City, Pangasinan","San Fernando City, La Union","San Fernando City, Pampanga","San Jose City","San Jose del Monte City","San Pablo City","Santa Rosa City","Santiago City","Mu\u00f1 City","Silay City","Sipalay City","Sorsogon City","Surigao City","Tabaco City","Tacloban City","Tacurong City","Tagaytay City","Tagbilaran City","Tagum City","Talisay City, Cebu", "Talisay City, Negros Occidental","Tanauan City","Tangub City","Tanjay City","Tarlac City","Taguig City","Toledo City","Trece Martires City","Tuguegarao City","Urdaneta City","Valencia City","Valenzuela City","Victorias City","Vigan City","Zamboanga City"
    ];

    $( "#searchCity" ).autocomplete({
      source: availableTags
    });
  });
