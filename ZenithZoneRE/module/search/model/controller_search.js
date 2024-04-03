function load_type_search() {
	// console.log("load_type")
	ajaxPromise("module/search/controller/controller_search.php?op=search_type", "GET", "JSON")
		.then(function (data) {
			console.log(data)
			$("<option>Type</option>").attr("selected", true).attr("disabled", true).appendTo("#search_type")
			for (row in data) {
				$('<option value="' + data[row].code_type + '">' + data[row].name_type + "</option>").appendTo("#search_type")
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function load_activity_search(type) {
	// localStorage.removeItem("filter_activity")
	// updateFiltersShop("code_act", null);

	if (type == undefined) {
		ajaxPromise("module/search/controller/controller_search.php?op=search_activity_null", "GET", "JSON")
			.then(function (data) {
				console.log(data)
				$("<option>Activity</option>").attr("selected", true).attr("disabled", true).appendTo("#search_activity")
				for (row in data) {
					$('<option value="' + data[row].code_act + '">' + data[row].name_act + "</option>").appendTo(
						"#search_activity"
					)
				}
			})
			.catch(function (error) {
				console.error(error)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
			})
	} else {
		console.log(type)
		ajaxPromise("module/search/controller/controller_search.php?op=search_activity", "GET", "JSON", type)
			.then(function (data) {
				console.log(data)
				$("<option>Activity</option>").attr("selected", true).attr("disabled", true).appendTo("#search_activity")
				for (row in data) {
					$('<option value="' + data[row].code_act + '">' + data[row].name_act + "</option>").appendTo(
						"#search_activity"
					)
				}
			})
			.catch(function (error) {
				console.error(error)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
			})
	}
}

function launch_search() {
	load_type_search()
	load_activity_search()

	$("#search_type").change(function () {
		let type = $(this).val()
		if (type === 0) {
			load_activity_search()
		} else {
			$("#search_activity").empty()
			localStorage.removeItem("filter_activity")
			load_activity_search({type})
		}
		FilterChange("filter_type", "code_type", type)
	})

	$("#search_activity").change(function () {
		FilterChange("filter_activity", "code_act", $(this).val())
	})
}

function FilterChange(filterKey, codeKey, value) {
	localStorage.setItem(filterKey, value)
	updateFiltersShop(codeKey, value)
}

function updateFiltersShop(codeKey, value) {
	let filters_shop = JSON.parse(localStorage.getItem("filters_shop")) || []
	let index = filters_shop.findIndex((filter) => filter[0] === codeKey)

	if (index !== -1) {
		filters_shop[index] = [codeKey, value]
	} else {
		filters_shop.push([codeKey, value])
	}

	localStorage.setItem("filters_shop", JSON.stringify(filters_shop))
}

function autocomplete() {
	console.log("autocomplete")
	$("#search_text").on("keyup", function () {
		let complete = {complete: $(this).val()}
		// if ($("#search_type").val() != 0) {
		// 	sdata.type = $("#search_type").val()
		// 	if ($("#search_type").val() != 0 && $("#search_activity").val() != 0) {
		// 		sdata.activity = $("#search_activity").val()
		// 	}
		// }
		// if ($("#search_type").val() == undefined && $("#search_activity").val() != 0) {
		// 	sdata.activity = $("#search_activity").val()
		// }
		ajaxPromise("module/search/controller/controller_search.php?op=autocomplete", "POST", "JSON", complete)
			.then(function (data) {
				console.log("autocomplete")
				$("#search_auto").empty()
				$("#search_auto").fadeIn(500)
				for (row in data) {
					$("<div></div>", {
						"class": "searchElement",
						"id": data[row].code_city,
						"text": data[row].name_city,
						"value": data[row].name_city,
					}).appendTo("#search_auto")
				}
			})
			.catch(function () {
				$("#search_auto").fadeOut(500)
			})
	})
	$(document).on("click", ".searchElement", function () {
		$("#search_text").val(this.id)
		$("#search_auto").fadeOut(1000)
	})
	// BUSCAR PARA QUE SIRVE ESTO
	// $(document).on('click scroll', function (event) {
	//     if (event.target.id !== 'autocom') {
	//         $('#search_auto').fadeOut(1000);
	//     }
	// });
}

function button_search() {
	$("#search_button").on("click", function () {
		// console.log("hola");
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})
}

$(document).ready(function () {
	// console.log("ready!")
	launch_search()
	autocomplete()
	button_search()
})
