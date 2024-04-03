function loadprops() {
	// ajaxForSearch("module/shop/controller/controller_shop.php?op=all_prop");
	// console.log("loadprops");
	var filters_home = JSON.parse(localStorage.getItem("filters_home")) || false
	var filters_details = JSON.parse(localStorage.getItem("filters_details")) || false
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop")) || false
	// var filters_search = JSON.parse(localStorage.getItem("filters_search")) || false

	if (filters_home !== false) {
		ajaxForSearch("module/shop/controller/controller_shop.php?op=filters_home")
	} else if (filters_details !== false) {
		// console.log(filters_details[0].property[0]);
		loadDetails(filters_details[0].property[0])
	} else if (filters_shop !== false) {
		ajaxForSearch_Shop("module/shop/controller/controller_shop.php?op=filters_shop")
		// console.log("filtershop");
		highlight_filters()
		// } else if (filters_search !== false) {
		// 	ajaxForSearch("module/shop/controller/controller_shop.php?op=filters_search")
		// 	// console.log("filterssearch");
	} else {
		ajaxForSearch("module/shop/controller/controller_shop.php?op=all_prop")
	}
}

// FUNCION QUE LLAMA A SALTO HOME
function ajaxForSearch(url) {
	var filters_home = JSON.parse(localStorage.getItem("filters_home"))
	localStorage.removeItem("filters_home")
	// console.log(filters_home);

	ajaxPromise(url, "POST", "JSON", {"filters_home": filters_home})
		.then(function (data) {
			console.log(data)
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				for (row in data) {
					var carousel = ""
					data[row].images.forEach(function (image) {
						carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
					})
					$("<div></div>").attr({"id": data[row].code_prop, "class": "propertytable"}).appendTo("#content_shop_prop")
						.html(`
                        <table>
                            <tr>
								<td rowspan="7" class="imagen">
                				    <div class="owl-container imagen shop">
                				        <div class="owl-list owl-carousel owl-theme imagen shop">
                				            ${carousel}
                				        </div>
                				    </div>
                				</td>
                                <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
									<h2>${data[row].price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;<i class="fa-solid fa-euro-sign"></i></h2></a>
								</td>
                            </tr>
                            <tr>
								<td colspan="8">${data[row].name_prop}</td>
							</tr>
							<tr>
								<td colspan="8">${data[row].description}</td>
							</tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                                <td class="text">${data[row].rooms}</td>
                                <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                                <td class="text">${data[row].baths}</td>
                                <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                                <td class="text">${data[row].name_cat}</td>
                            </tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                                <td class="text">${data[row].m2}</td>
                                <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                                <td class="text">${data[row].name_city}</td>
                                <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                                <td class="text">${data[row].name_extra}</td>
                            </tr>
							<tr>
                                <td colspan='8'>
                                    <button id='${
																			data[row].code_prop
																		}' class='more_info_list Button_principal'>More Info</button>
                                </td>
							</tr>
                        </table>
					`)
				}
				$(".owl-list").owlCarousel({
					loop: true,
					autoplay: true,
					margin: 10,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 1,
						},
						1000: {
							items: 1,
						},
					},
				})
			}
		})
		.catch(function (e) {
			console.error(e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// FUNCION QUE LLAMA A CARGAR SHOP
function ajaxForSearch_Shop(url) {
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop"))
	// console.log(filters_shop);

	ajaxPromise(url, "POST", "JSON", {"filters_shop": filters_shop})
		.then(function (data) {
			console.log(data)
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				for (row in data) {
					var carousel = ""
					data[row].images.forEach(function (image) {
						carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
					})
					$("<div></div>").attr({"id": data[row].code_prop, "class": "propertytable"}).appendTo("#content_shop_prop")
						.html(`
                        <table>
                            <tr>
								<td rowspan="7" class="imagen">
                				    <div class="owl-container imagen shop">
                				        <div class="owl-list owl-carousel owl-theme imagen shop">
                				            ${carousel}
                				        </div>
                				    </div>
                				</td>
                                <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
									<h2>${data[row].price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;<i class="fa-solid fa-euro-sign"></i></h2></a>
								</td>
                            </tr>
                            <tr>
								<td colspan="8">${data[row].name_prop}</td>
							</tr>
							<tr>
								<td colspan="8">${data[row].description}</td>
							</tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                                <td class="text">${data[row].rooms}</td>
                                <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                                <td class="text">${data[row].baths}</td>
                                <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                                <td class="text">${data[row].name_cat}</td>
                            </tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                                <td class="text">${data[row].m2}</td>
                                <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                                <td class="text">${data[row].name_city}</td>
                                <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                                <td class="text">${data[row].name_extra}</td>
                            </tr>
							<tr>
                                <td colspan='8'>
                                    <button id='${
																			data[row].code_prop
																		}' class='more_info_list Button_principal'>More Info</button>
                                </td>
							</tr>
                        </table>
					`)
				}
				$(".owl-list").owlCarousel({
					loop: true,
					autoplay: true,
					margin: 10,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 1,
						},
						1000: {
							items: 1,
						},
					},
				})
			}
			load_map_shop(data)
		})
		.catch(function (e) {
			console.error(e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// FUNCION QUE LLAMA A CARGAR DETAILS
function clicks() {
	$(document).on("click", ".more_info_list", function () {
		var code_prop = this.getAttribute("id")
		localStorage.setItem("code_prop", code_prop)
		// console.log(code_prop);
		loadDetails(code_prop)
	})
}

function loadDetails(code_prop) {
	localStorage.removeItem("filters_details")

	ajaxPromise("module/shop/controller/controller_shop.php?op=details_prop&id=" + code_prop, "GET", "JSON")
		.then(function (data) {
			// console.log(data);
			$("#content_shop_prop").empty()
			$("#filters_shop").empty()
			$(".date_img_dentro").empty()
			$(".date_prop_dentro").empty()
			$(".orderbyshop").empty()

			for (row in data[1][0]) {
				$("<div></div>").attr({"id": data[1][0].code_img, class: "item date_img_dentro"}).appendTo(".date_img").html(`
                    <div class='detailsimg'>
                        <img src='${data[1][0][row].img_prop}'></img>
                    </div>`)
			}

			$("<div></div>")
				.attr({"id": data[0].code_prop, class: "date_prop_dentro"})
				.appendTo(".date_prop")
				.html(
					`<div class="list_product_details">
							<div class="product-info_details">
							<div class="product-content_details detailstable">
								<br />
								<h1>
									<b>${data[0].name_prop}</b>
								</h1>
								<hr class="hr-shop" />
								<table id="table-shop">
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bed fa-2xl"></i>
										</td>
										<td class="text">${data[0].rooms}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bath fa-2xl"></i>
										</td>
										<td class="text">${data[0].baths}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-expand fa-2xl"></i>
										</td>
										<td class="text">${data[0].m2}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-key fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_cat}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-house fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_type}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-plus fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_extra}</td>
									</tr>
								</table>
								<br />
								<h3>
									<b>More Information:</b>
								</h3>
								<p>${data[0].description}</p>
								<br />
								<hr class="hr-shop" />
								<div class="buttons_details">
									<span class="button" id="price_details" style="font-size: 24px;">
										${data[0].price} &nbsp;
										<i class="fa-solid fa-euro-sign"></i>
									</span>
									<br />
									<br />
									<a class="Button_principal contact" href="#">
										Contacta
									</a>
								</div>
							</div>
						</div>
					</div>`
				)
			$(".owl-details").owlCarousel({
				loop: true,
				autoplay: true,
				margin: 10,
				nav: false,
				dots: true,
				responsive: {
					0: {
						items: 1,
					},
					600: {
						items: 2,
					},
					1000: {
						items: 2,
					},
				},
			})
			load_map_details(data[0])
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
		})
}

// FUNCION QUE IMPRIME LOS FILTROS
function print_filters() {
	// console.log("print_filters");
	$(
		'<div class="banner-filters" style="display: flex; flex-direction: row; justify-content: space-between;"></div>'
	).appendTo(".filters-select").html(`
				<select class="form-select filter_type" id="filter_type">
					<option value="0" selected disabled>Type</option>
					
				</select>
				<select class="form-select filter_location" id="filter_location">
					<option value="0" selected disabled>Location</option>
					
				</select>
				<select class="form-select filter_category" id="filter_category">
					<option value="0" selected disabled>Category</option>
					
				</select>
				<button class="form-select filter_rooms buttonroom" id="filter_rooms">
					Rooms		
				</button>
				<button class="form-select filter_bath buttonbath" id="filter_bath">
					Bath					
				</button>
				<button class="form-select filter_size buttonsize" id="filter_size">
					Size
				</button>
				<button class="form-select filter_price buttonprice" id="filter_price">
					Price
				</button>
				<button class="form-select filter_extra" id="filter_extra">
					Extras					
				</button>
				<select class="form-select filter_activity" id="filter_activity">
					<option value="0" selected disabled>Activities</option>
				</select>
				
				<button class="filter_remove Button_segundario" id="Remove_filter">Remove</button>
				`)
	$
	print_type()
	print_location()
	print_category()
	// print_extra();
	print_activity()
	modalrooms()
	modalbath()
	modalsize()
	modalprice()
	modalextra()

	$(document).on("click", "#Remove_filter", function () {
		remove_filter()
	})
}

function print_type() {
	// console.log("print_dynamic_filters")
	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_type", "GET", "JSON")
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_type}).appendTo("#filter_type").html(data[row].name_type)
			}
			var selectedOption = localStorage.getItem("filter_type")
			if (selectedOption) {
				$("#filter_type").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_location() {
	// console.log("print_dynamic_filters")
	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_city", "GET", "JSON")
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_city}).appendTo("#filter_location").html(data[row].name_city)
			}
			var selectedOption = localStorage.getItem("filter_location")
			if (selectedOption) {
				$("#filter_location").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_category() {
	// console.log("print_dynamic_filters")
	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_category", "GET", "JSON")
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_cat}).appendTo("#filter_category").html(data[row].name_cat)
			}
			var selectedOption = localStorage.getItem("filter_category")
			if (selectedOption) {
				$("#filter_category").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_extra() {
	// console.log("print_dynamic_filters")
	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_extra", "GET", "JSON")
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_extra}).appendTo("#filter_extra").html(data[row].name_extra)
			}
			var selectedOption = localStorage.getItem("filter_extra")
			if (selectedOption) {
				$("#filter_extra").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_activity() {
	// console.log("print_dynamic_filters")
	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_activity", "GET", "JSON")
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_act}).appendTo("#filter_activity").html(data[row].name_act)
			}
			var selectedOption = localStorage.getItem("filter_activity")
			if (selectedOption) {
				$("#filter_activity").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

// MODALES
function modalrooms() {
	$("#filter_rooms").click(function () {
		$("#filtersModalRoom").modal("show")
		localStorage.setItem("filter_rooms", this.value)
		// console.log("modalrooms");
	})

	$("#ApplyFiltersRoom").click(function () {
		// console.log("modalrooms")
		var selectedValueroom = $('input[name="rooms"]:checked').val()
		localStorage.setItem("filter_rooms", selectedValueroom)
		$("#filtersModalRoom").modal("hide")
		applyFilters()
	})
	if (localStorage.getItem("filter_rooms")) {
		$(".filter_rooms").val(localStorage.getItem("filter_rooms"))
	}

	$("#CloseFiltersRoom").click(function () {
		$("#filtersModalRoom").modal("hide")
	})
}

function modalbath() {
	$("#filter_bath").click(function () {
		$("#filtersModalBath").modal("show")
		localStorage.setItem("filter_bath", this.value)
		// console.log("modalbath");
	})

	$("#ApplyFiltersBath").click(function () {
		// console.log("modalbath")
		var selectedValuebath = $('input[name="bath"]:checked').val()
		localStorage.setItem("filter_bath", selectedValuebath)
		$("#filtersModalBath").modal("hide")
		applyFilters()
	})
	if (localStorage.getItem("filter_bath")) {
		$(".filter_bath").val(localStorage.getItem("filter_bath"))
	}

	$("#CloseFiltersBath").click(function () {
		$("#filtersModalBath").modal("hide")
	})
}

var selectedValuesize
function modalsize() {
	$(document).ready(function () {
		$("#rangeSlidersize").on("input", function () {
			selectedValuesize = $(this).val()
			// console.log(selectedValuesize)
			$("#selectedValuesize").text(selectedValuesize)
		})

		$("#filter_size").click(function () {
			$("#filtersModalSize").modal("show")
		})

		$("#ApplyFiltersSize").click(function () {
			// console.log("modalsize")
			localStorage.setItem("filter_size", selectedValuesize)
			$("#filtersModalSize").modal("hide")
			applyFilters()
		})

		$("#CloseFiltersSize").click(function () {
			$("#filtersModalSize").modal("hide")
		})
	})
}

var selectedValueprice
function modalprice() {
	$(document).ready(function () {
		$("#rangeSliderprice").on("input", function () {
			selectedValueprice = $(this).val()
			// console.log(selectedValueprice)
			$("#selectedValueprice").text(selectedValueprice)
		})

		$("#filter_price").click(function () {
			$("#filtersModalPrice").modal("show")
		})

		$("#ApplyFiltersPrice").click(function () {
			// console.log("modalprice")
			localStorage.setItem("filter_price", selectedValueprice)
			$("#filtersModalPrice").modal("hide")
			applyFilters()
		})

		$("#CloseFiltersPrice").click(function () {
			$("#filtersModalPrice").modal("hide")
		})
	})
}

function modalextra() {
	$("#filter_extra").click(function () {
		$("#filtersModalExtra").modal("show")
	})

	$("#ApplyFiltersExtra").click(function () {
		var extraValues = $("input[name='extra[]']:checked")
			.map(function () {
				return parseInt(this.value) // Convierte el valor a un entero
			})
			.get()
		localStorage.setItem("filter_extra", JSON.stringify(extraValues))
		$("#filtersModalExtra").modal("hide")
		// applyFilters()
	})
	if (localStorage.getItem("filter_extra")) {
		var extraValues = JSON.parse(localStorage.getItem("filter_extra"))
		$(".filter_extra").val(extraValues.join(", "))
	}

	$("#CloseFiltersExtra").click(function () {
		$("#filtersModalExtra").modal("hide")
	})
}

// FUNCIONES DE FILTROS
function filters_shop() {
	// console.log("filters_shop");

	$(".filter_type").change(function () {
		localStorage.setItem("filter_type", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_type")) {
		$(".filter_type").val(localStorage.getItem("filter_type"))
	}

	$(".filter_location").change(function () {
		localStorage.setItem("filter_location", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_location")) {
		$(".filter_location").val(localStorage.getItem("filter_location"))
	}

	$(".filter_category").change(function () {
		localStorage.setItem("filter_category", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_category")) {
		$(".filter_category").val(localStorage.getItem("filter_category"))
	}

	$(".filter_rooms").change(function () {
		localStorage.setItem("filter_rooms", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_rooms")) {
		$(".filter_rooms").val(localStorage.getItem("filter_rooms"))
	}

	$(".filter_bath").change(function () {
		localStorage.setItem("filter_bath", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_bath")) {
		$(".filter_bath").val(localStorage.getItem("filter_bath"))
	}

	$(".filter_size").change(function () {
		localStorage.setItem("filter_size", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_size")) {
		$(".filter_size").val(localStorage.getItem("filter_size"))
	}

	$(".filter_price").change(function () {
		localStorage.setItem("filter_price", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_price")) {
		$(".filter_price").val(localStorage.getItem("filter_price"))
	}

	$(".filter_extra").change(function () {
		localStorage.setItem("filter_extra", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_extra")) {
		$(".filter_extra").val(localStorage.getItem("filter_extra"))
	}

	$(".filter_activity").change(function () {
		localStorage.setItem("filter_activity", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_activity")) {
		$(".filter_activity").val(localStorage.getItem("filter_activity"))
	}
}

function applyFilters() {
	// console.log("applyFilters")
	var filters_shop = []

	localStorage.removeItem("filters")

	if (localStorage.getItem("filter_type")) {
		filters_shop.push(["code_type", localStorage.getItem("filter_type")])
		// localStorage.removeItem("filter_type");
	}
	if (localStorage.getItem("filter_category")) {
		filters_shop.push(["code_cat", localStorage.getItem("filter_category")])
		// localStorage.removeItem("filter_category");
	}
	if (localStorage.getItem("filter_location")) {
		filters_shop.push(["code_city", localStorage.getItem("filter_location")])
		// localStorage.removeItem("filter_location");
	}
	if (localStorage.getItem("filter_rooms")) {
		filters_shop.push(["rooms", localStorage.getItem("filter_rooms")])
		// localStorage.removeItem("filter_rooms");
	}
	if (localStorage.getItem("filter_bath")) {
		filters_shop.push(["baths", localStorage.getItem("filter_bath")])
		// localStorage.removeItem("filter_bath");
	}
	if (localStorage.getItem("filter_size")) {
		filters_shop.push(["m2", localStorage.getItem("filter_size")])
		// localStorage.removeItem("filter_size");
	}
	if (localStorage.getItem("filter_price")) {
		filters_shop.push(["price", localStorage.getItem("filter_price")])
		// localStorage.removeItem("filter_price");
	}
	if (localStorage.getItem("filter_extra")) {
		filters_shop.push(["code_extra", JSON.parse(localStorage.getItem("filter_extra"))])
		// localStorage.removeItem("filter_extra");
	}
	if (localStorage.getItem("filter_activity")) {
		filters_shop.push(["code_act", localStorage.getItem("filter_activity")])
		// localStorage.removeItem("filter_activity");
	}

	localStorage.setItem("filters_shop", JSON.stringify(filters_shop))
	location.reload()
}

function highlight_filters() {
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop"))
	// console.log(filters_shop);

	for (var i = 0; i < filters_shop.length; i++) {
		if (filters_shop[i][0] === "code_type") {
			// console.log(filters_shop[0][1]);
			// document.getElementById("filter_type").value = "3";
			$("#filter_type").val(filters_shop[0][1])
			$("#filter_type").addClass("activefilter")
		}
		if (filters_shop[i][0] === "code_city") {
			// console.log(filters_shop[i][1]);
			$("#filter_location").val(filters_shop[i][1])
			$("#filter_location").addClass("activefilter")
		}
		if (filters_shop[i][0] === "code_cat") {
			// console.log(filters_shop[i][1]);
			$("#filter_category").val(filters_shop[i][1])
			$("#filter_category").addClass("activefilter")
		}
		if (filters_shop[i][0] === "rooms") {
			// console.log(filters_shop[i][1]);
			$("#filter_rooms").val(filters_shop[i][1])
			$("#filter_rooms").addClass("activefilter")
			if (localStorage.getItem("filter_rooms")) {
				var roomsValue = parseInt(localStorage.getItem("filter_rooms"))
				$("input[name='rooms']")
					.filter("[value='" + roomsValue + "']")
					.prop("checked", true)
				$(".buttonroom").text(roomsValue)
			}
		}
		if (filters_shop[i][0] === "baths") {
			// console.log(filters_shop[i][1]);
			$("#filter_bath").val(filters_shop[i][1])
			$("#filter_bath").addClass("activefilter")
			if (localStorage.getItem("filter_bath")) {
				var bathsValue = parseInt(localStorage.getItem("filter_bath"))
				console.log(bathsValue)
				$("input[name='bath']")
					.filter("[value='" + bathsValue + "']")
					.prop("checked", true)
				$(".buttonbath").text(bathsValue)
			}
		}
		if (filters_shop[i][0] === "m2") {
			// console.log(filters_shop[i][1]);
			$("#filter_size").val(filters_shop[i][1])
			$("#filter_size").addClass("activefilter")
			if (localStorage.getItem("filter_size")) {
				selectedValuesize = localStorage.getItem("filter_size")
				console.log(selectedValuesize)
				$("#rangeSlidersize").val(selectedValuesize)
				$("#selectedValuesize").text(selectedValuesize)
				$(".buttonsize").text(selectedValuesize)
			}
		}
		if (filters_shop[i][0] === "price") {
			// console.log(filters_shop[i][1]);
			$("#filter_price").val(filters_shop[i][1])
			$("#filter_price").addClass("activefilter")
			if (localStorage.getItem("filter_price")) {
				selectedValueprice = localStorage.getItem("filter_price")
				$("#rangeSliderprice").val(selectedValueprice)
				$("#selectedValueprice").text(selectedValueprice)
				$(".buttonprice").text(selectedValueprice)
			}
		}
		if (filters_shop[i][0] === "code_extra") {
			// console.log(filters_shop[i][1]);
			$("#filter_extra").val(filters_shop[i][1])
			$("#filter_extra").addClass("activefilter")
			if (localStorage.getItem("filter_extra")) {
				var extraValues = JSON.parse(localStorage.getItem("filter_extra"))
				extraValues.forEach(function (value) {
					$("input[name='extra[]'][value='" + value + "']").prop("checked", true)
				})
			}
		}
		if (filters_shop[i][0] === "code_act") {
			// console.log(filters_shop[i][1]);
			$("#filter_activity").val(filters_shop[i][1])
			$("#filter_activity").addClass("activefilter")
		}
	}
}

function remove_filter() {
	localStorage.removeItem("filters_shop")
	localStorage.removeItem("filter_extra")
	localStorage.removeItem("filter_price")
	localStorage.removeItem("filter_size")
	localStorage.removeItem("filter_bath")
	localStorage.removeItem("filter_rooms")
	localStorage.removeItem("filter_category")
	localStorage.removeItem("filter_location")
	localStorage.removeItem("filter_type")
	localStorage.removeItem("filter_activity")
	location.reload()
}

function filter_orderby() {
	// console.log("orderby");
	$("#filter_orderby").change(function () {
		var orderby = this.value
		console.log(orderby)
		localStorage.setItem("filter_orderby", orderby)
		// location.reload()
		print_orderby()
	})
	if (localStorage.getItem("filter_orderby")) {
		$("#filter_orderby").val(localStorage.getItem("filter_orderby"))
	}
}

function print_orderby() {
	console.log("print_orderby")
	ajaxPromise("module/shop/controller/controller_shop.php?op=orderby", "POST", "JSON", {
		"orderby": localStorage.getItem("filter_orderby"),
	})
		.then(function (data) {
			console.log("dentro de then print_orderby")
			console.log(data)
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				for (row in data) {
					var carousel = ""
					data[row].images.forEach(function (image) {
						carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
					})
					$("<div></div>").attr({"id": data[row].code_prop, "class": "propertytable"}).appendTo("#content_shop_prop")
						.html(`
                        <table>
                            <tr>
								<td rowspan="7" class="imagen">
                				    <div class="owl-container imagen shop">
                				        <div class="owl-list owl-carousel owl-theme imagen shop">
                				            ${carousel}
                				        </div>
                				    </div>
                				</td>
                                <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
									<h2>${data[row].price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;<i class="fa-solid fa-euro-sign"></i></h2></a>
								</td>
                            </tr>
                            <tr>
								<td colspan="8">${data[row].name_prop}</td>
							</tr>
							<tr>
								<td colspan="8">${data[row].description}</td>
							</tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                                <td class="text">${data[row].rooms}</td>
                                <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                                <td class="text">${data[row].baths}</td>
                                <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                                <td class="text">${data[row].name_cat}</td>
                            </tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                                <td class="text">${data[row].m2}</td>
                                <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                                <td class="text">${data[row].name_city}</td>
                                <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                                <td class="text">${data[row].name_extra}</td>
                            </tr>
							<tr>
                                <td colspan='8'>
                                    <button id='${
																			data[row].code_prop
																		}' class='more_info_list Button_principal'>More Info</button>
                                </td>
							</tr>
                        </table>
					`)
				}
				$(".owl-list").owlCarousel({
					loop: true,
					autoplay: true,
					margin: 10,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 1,
						},
						1000: {
							items: 1,
						},
					},
				})
			}
			localStorage.removeItem("filter_orderby")
		})
		.catch(function (e) {
			console.error(e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// MAPAS
function load_map_shop(data) {
	mapboxgl.accessToken = "pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g"
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
		zoom: 6, // starting zoom
	})

	for (row in data) {
		const marker = new mapboxgl.Marker()
		const minPopup = new mapboxgl.Popup()
		minPopup.setHTML(
			'<h3 style="text-align:center;">' +
				data[row].name_prop +
				'</h3><p style="text-align:center;">M2: <b>' +
				data[row].m2 +
				"</b></p>" +
				'<p style="text-align:center;">Price: <b>' +
				data[row].price +
				"€</b></p>" +
				'<img src=" ' +
				data[row].images[0] +
				'"/>' +
				'<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall link" data-wow-delay=".4s" id="' +
				data[row].code_prop +
				'">Read More</a>'
		)
		marker.setPopup(minPopup).setLngLat([data[row].longitud, data[row].latitud]).addTo(map)
	}
}

function load_map_details(code_prop) {
	mapboxgl.accessToken = "pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g"
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: [code_prop.longitud, code_prop.latitud], // starting position [lng, lat]
		zoom: 10, // starting zoom
	})
	const markerDetails = new mapboxgl.Marker()
	const minPopup = new mapboxgl.Popup()
	minPopup.setHTML(
		"<h4>" +
			code_prop.name_prop +
			"</h4><p>M2: " +
			code_prop.m2 +
			"</p>" +
			"<p>Price: " +
			code_prop.price +
			"€</p>" +
			'<img src=" ' +
			code_prop.images[0] +
			'"/>'
	)
	markerDetails.setPopup(minPopup).setLngLat([code_prop.longitud, code_prop.latitud]).addTo(map)
}

$(document).ready(function () {
	// console.log("loadprops1");
	print_filters()
	filter_orderby()
	loadprops()
	clicks()
	filters_shop()
})
