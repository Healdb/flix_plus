// This file was generated by including the allheader and allfooter and adding an extra script for hide_synopsis that should
// be run prior to images being shown.  Ideally, the compiler would generate this file from metadata.

document_$START_OR_END_code = function() {

if ((location.host === "dvd.netflix.com") && location.pathname.indexOf("/Search") !== 0)
{
  consolelog("DVD pages not supported (except search)");
  return; // do not affect dvd pages except for the search page
}

// Make sure that page icon appears to show preferences
chrome.runtime.sendMessage({}, function(response) { });

var startTime = new Date();
var __debug_level = 0;
var enabled_scripts = {};

load_enabled_scripts = function(profile_name, default_scripts, callback)
{
  consolelog("load_enabled_scripts");
  var keyname = "flix_plus " + profile_name + " prefs";
  consolelog(keyname);  
  var _callback = callback;

  fplib.syncGet(keyname, function(items)
  {
    consolelog("found prefs:");
    consolelog(items);
    //var all_prefs = localStorage["$EXTSHORTNAME " + profile_name + " prefs"];
    var all_prefs = items[keyname];
    if (typeof(all_prefs) === 'undefined')
      all_prefs = default_scripts;
    var enabled_scripts = {};
  
    var all_prefs_array = all_prefs.split(",");
    for (i = 0; i < all_prefs_array.length; i++)
    {
      if (all_prefs_array[i] !== "")
        enabled_scripts[all_prefs_array[i]] = "true";
    }
    consolelog(2, enabled_scripts);

    callback(enabled_scripts);
  });
}

function consolelog(msg)
{
    consolelog(0, msg);
}
function consolelog(level, msg)
{
    // Levels:
    // -- 0 = no messages
    // -- 1 = just high level messages (produced by compiler)
    // -- 2 = less important messages (produced by compiler)
    // -- 3 = all messages (produced by userscripts)

    if (level <= __debug_level)
        console.log(msg);
}

main = function(callback)
{
   __debug_level = localStorage["flix_plus debug_level"];
  if(typeof(__debug_level) === "undefined")
    __debug_level = 0;

  var profile_name = fplib.getProfileName();
  consolelog(1, "profile name is " + profile_name);
  
  var default_scripts = "id_export_ratings,id_queue_sorter,id_ratings,id_random_ep,id_fade_rated,id_links,id_granulizer,id_scrollbuster,id_sectionhider,id_fade_watched,id_removefb,id_previewlink,id_hide_postplay,id_keyboard_shortcuts,id_netflixnotes,id_boximages_in_queue,id_remove_dupes,id_hide_synopsis,id_detail_view,id_expiring";
  consolelog(2,"Loading prefs");
  consolelog(default_scripts);
  load_enabled_scripts(profile_name, default_scripts, function(enabled_scripts_param)
  {
//    console.log("param = ");
    consolelog("enabled_scripts = ");
    consolelog(enabled_scripts_param);
    enabled_scripts = enabled_scripts_param;

    var settings_loaded_time = new Date();
    consolelog(1, 'settings loaded time = ' + (settings_loaded_time-startTime) + 'ms');

    callback();
  });
}


run_scripts = function()
{




var ___contentscript_id = "id_hide_synopsis";

//console.log(enabled_scripts["id_hide_synopsis"]);

if ( (enabled_scripts !== null) && (((typeof(enabled_scripts["id_hide_synopsis"]) === 'undefined')) || (enabled_scripts["id_hide_synopsis"] !== "true")) 	)
	return;

//console.log(enabled_scripts);

if (location.pathname.indexOf("/WiPlayer") === 0)
{
	var div = document.createElement("div");
	div.id = "fp_blackscreen";
	div.style.height = "100%";
	div.style.width = "100%";
	div.style["background"] = "black";
	div.style["z-index"] = "99999";
	div.style["position"] = "fixed";
	div.style["top"] = "0px";
	div.style["left"] = "0px";
	div.style["opacity"] = 1;
	div.style["visibility"] = "visible";
  div.style["text-align"] = "center";
  div.style["vertical-align"] = "middle";

  div.innerText = "Potential spoiler image hidden.  If video doesn't show click here.";
	document.body.appendChild(div);
  div.addEventListener("click", function() {
    //console.log('clicked');
    document.getElementById("fp_blackscreen").style.display = "none"
  });
	consolelog("made black screen");
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Beginning of file-level footer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}  // main

  main(run_scripts);
  var endTime = new Date();
  consolelog(1, 'full load time = ' + (endTime-startTime) + 'ms');

}(); // global scope
