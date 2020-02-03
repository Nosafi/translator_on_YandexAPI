(function init() {
  $(".language_from").val("No text");
  events();
})();

function events() {
  $(".input_from").on("input", async function() {
    await getLanguage($(".input_from").val());
    search_tr_lang($(".language_from").val());
  });
  $(".tr_btn").on("click", function() {
    let_translate($(".input_from").val());
  });
}

async function getLanguage(word) {
  if (word) {
    let text = encodeURI(word);
    let url =
      "https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20200201T180127Z.43fab81f42c4c21e.87959d03df7e0c3cf284cb4cb65d65bec2ee466d&text=" +
      text;
    const data = await fetch(url);
    const regular_data = await data.json();

    $(".language_from").val(regular_data.lang);
  } else {
    $(".language_from").val("No text");
  }
}

async function search_tr_lang(check_lang) {
  if ($(".input_from").val()) {
    $(".input_to").val("");
    let url =
      "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20200201T180127Z.43fab81f42c4c21e.87959d03df7e0c3cf284cb4cb65d65bec2ee466d&ui=ru";
    let str = "";
    const regular_data = await fetch(url);
    const data = await regular_data.json();

    for (let i = 0; i < data.dirs.length; i++) {
      let reg_langs = data.dirs[i].split("-");
      console.log(reg_langs);
      if (reg_langs[0] == check_lang) {
        str +=
          "<option value='" + reg_langs[1] + "'>" + reg_langs[1] + "</option>";
      }
    }
    $(".language_to").html(str);
  } else {
    $(".language_to").html("");
  }
}

async function let_translate(word) {
  if (word) {
    let text = encodeURI(word);
    let url =
      "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200201T180127Z.43fab81f42c4c21e.87959d03df7e0c3cf284cb4cb65d65bec2ee466d";
    let lang_from = $(".language_from").val();
    let lang_to = $(".language_to").val();
    let from_to = "&lang=" + lang_from + "-" + lang_to;
    let tr_text = "&text=" + text;

    url += from_to + tr_text;
    let answear = await fetch(url);
    let data = await answear.json();

    $(".input_to").val(data.text);
  } else {
    alert("Please, input text!");
  }
}
