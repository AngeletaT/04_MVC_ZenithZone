function load_type_search() {
	// console.log("load_type")
	ajaxPromise("module/search/controller/controller_search.php?op=search_type", "POST", "JSON")
		.then(function (data) {
			// console.log(data)
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
		ajaxPromise("module/search/controller/controller_search.php?op=search_activity_null", "POST", "JSON")
			.then(function (data) {
				// console.log(data)
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
		ajaxPromise("module/search/controller/controller_search.php?op=search_activity", "POST", "JSON", type)
			.then(function (data) {
				// console.log(data)
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
	// console.log("autocomplete")
	$("#search_text").on("keyup", function () {
		let sdata = {complete: $(this).val()}
		// Valor de type existe
		if ($("#search_type").val() != null) {
			sdata.type = $("#search_type").val()
			// Valor de type y activity existe
			if ($("#search_type").val() != null && $("#search_activity").val() != null) {
				sdata.activity = $("#search_activity").val()
			}
			// Valor de type no existe y activity existe
		} else if ($("#search_type").val() == undefined && $("#search_activity").val() != null) {
			sdata.activity = $("#search_activity").val()
		}

		console.log(sdata)
		ajaxPromise("module/search/controller/controller_search.php?op=autocomplete", "POST", "JSON", sdata)
			.then(function (data) {
				// console.log("autocompletepromise")
				// console.log(data)
				$("#search_auto").empty()
				$("#search_auto").fadeIn(500)
				if (data.length == 0) {
					$("<div></div>", {
						"class": "searchElement",
						"text": "No existen datos",
					}).appendTo("#search_auto")
				} else {
					for (row in data) {
						$("<div></div>", {
							"class": "searchElement",
							"id": data[row].code_city,
							"text": data[row].name_city,
							"value": data[row].name_city,
						}).appendTo("#search_auto")
					}
				}
			})
			.catch(function (e) {
				console.error("Peta el post")
				console.log(e)
				$("#search_auto").fadeOut(500)
			})
	})
	$(document).on("click", ".searchElement", function () {
		$("#search_text").val(this.id)
		$("#search_auto").fadeOut(1000)
	})
}

function button_search() {
	$("#search_button").on("click", function () {
		// console.log("Button search");
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
