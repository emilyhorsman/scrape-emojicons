/* jslint node: true */
'use strict';

var cheerio = require('cheerio');
var request = require('request');

function dom_emoji_listing($) {
  var title = $(this).children('.title').text().trim();
  var emoji = $(this).find('textarea').data('text');
  console.log(title + ':\t' + emoji);
}

function get_emoji(url) {
  request(url, function(err, res, body) {
    if (err)
      return;

    if (res.statusCode !== 200)
      return;

    var $ = cheerio.load(body);

    var url = $('a.next_page').attr('href');
    if (url)
      get_emoji('http://emojicons.com' + url);

    $('.emoticon-item').each(function() {
      dom_emoji_listing.call(this, $);
    });
  });
}

get_emoji('http://emojicons.com/popular/');
