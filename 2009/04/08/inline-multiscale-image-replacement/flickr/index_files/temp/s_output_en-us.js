//
// tunablaster: ENGAGED
// all string outputs are defined in the object declaration and contained in the format_strs hash:

F.output.thou_sep = ',';
F.output.dec_sep = '.';
F.output.date_strs = {
	daysA: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	days_abbA: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	months_abbA: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
	monthsA: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}
	
F.output.format_strs = {
	you: '(You)',
	me: 'me',
	searching: 'Searching...',
	search: 'Search',
	create_up: 'CREATE',
	leave_it: 'leave it',
	remove: 'remove',
	remove_up: 'REMOVE',
	map: 'Map',
	ban_up: 'BAN',
	saving: 'Saving...',
	remain_here: 'remain here',
	returnn: 'return',
	continuing: 'continuing...',
	and: 'and',
	by: 'by',
	undo: 'undo',
	yes_delete: 'yes, delete',
	ok: 'OK',
	go_up: 'GO',
	save: 'Save',
	save_up: 'SAVE',
	or_up: 'OR',
	cancel: 'Cancel',
	deleted: 'deleted',
	cancel_up: 'CANCEL',
	close: 'Close',
	close_up: 'CLOSE',
	go_ahead: 'yes, go ahead',
	no: 'No!',
	yes_up: 'YES',
	no_up: 'NO',
	open_set: 'Open set',
	continuoo: 'Continue',
	deletee_nobang: 'Delete',
	deletee: 'Delete!',
	delete_up: 'DELETE',
	delete_question: 'Delete?',
	thanks: 'Thanks!',
	no_thanks: 'No thanks',
	send_it: 'send it',
	api_err_generic: 'There was an error:',
	set_tab_title: 'Set: %s',
	group_tab_title: 'Group: %s',
	some_html: 'Some HTML is OK',
	some_tiny_html: 'A tiny bit of HTML is OK',
	api_err_changes_not_saved: 'Changes were not saved. There was an error:',
	unknown_err: 'unknown error',
	status_sending_msg: 'Sending message...',
	unsaved_msg: 'You have unsaved changes. Press OK to discard them, or cancel to remain on this page.',
	too_many_tabs_msg: 'You have too many Organizr tabs open to open a new one. Please close some tabs first, or widen your browser window, if you can.',
	in_the_findr_batch: 'We\'ve put the batch into the Findr for you (below). All you have to do now is drag items onto the map!',
	in_the_findr: 'We\'ve put the photo into the Findr for you (below). All you have to do now is drag it onto the map!',
	in_the_findr_set: 'We\'ve put the set into the Findr for you (below). All you have to do now is drag items onto the map!',
	no_photos: 'We can\'t do that until you have some items in the batch!',
	limits_checking: 'Checking group posting limits...',
	photos_not_added_to_group: '<b>Items were not added to the group pool.</b>',
	add_to_set_drag_tip: 'add to <b>%s</b>',
	see_group_page: 'See the <b><a target="_new" href="/groups/%s/">%s</a></b> group page for more information.',
	pool_limits_disabled: 'Uploads have been disabled for %s.',
	loading: 'Loading...',
	loading_photo: 'Loading item...',
	loading_interface: 'Loading interface...',
	building_interface: 'Building interface...',
	loading_info: 'Loading info...',
	acting_count_photos: 'Acting on 1 item',
	acting_count_photos_plural: 'Acting on %s items',
	prev_page: 'Previous page',
	next_page: 'Next page',
	curr_page: 'Page <b>%s</b> of <b>%s</b>',
	prev: 'Prev',
	next: 'Next',
	save_all: 'SAVE ALL',
	save_done: 'SAVE AND BE DONE',
	save_and_go: 'SAVE AND GO TO NEXT PAGE',
	tag_tip: 'Separate each tag with a space: <i>cameraphone urban moblog</i>. Or to join 2 words together in one tag, use double quotes: <i>"daily commute"</i>.',
	add_to_favorites: 'Add to favorites',
	a_favorites: 'A favorite',
	edit_photo: 'Edit item',
	show_detail: 'Show detail',
	hide_detail: 'Hide detail',
	view_photo_page: 'View main page',
	x_of_y: '<b>%s</b> of <b>%s</b>',
	zoom_in: 'Zoom in',
	carry_on: 'Carry on',

	pool_limit_day: 'You can only add 1 item per day to %s.',
	pool_limit_week: 'You can only add 1 item per week to %s.',
	pool_limit_month: 'You can only add 1 item per month to %s.',
	pool_limit_ever: 'You can only add 1 item to %s.',
	
	pool_limit_day_plural: 'You can only add %s items per day to %s.',
	pool_limit_week_plural: 'You can only add %s items per week to %s.',
	pool_limit_month_plural: 'You can only add %s items per month to %s.',
	pool_limit_ever_plural: 'You can only add %s items to %s.',
	
	
	pool_limit_reached: 'You\'ve already added %s. Remove something from the pool if you want to add more.',
	pool_limit_will_be_reached: 'You tried to add %s items, and we\'re not sure which of the %s you\'d like to add, so please choose %s or fewer and add those instead. Sorry about that!',
	pool_limit_will_be_reached_exactly: 'You\'ve already added %s, so adding another %s would exceed that limit.',
	
	all_approx: 'All of these have approximate dates, which means they can\'t be time shifted.',
	some_approx: 'NOTE: 1 of the items in this batch has an approximate date, which means it can\'t be time shifted. We can time shift the others though, if you wish.',
	some_approx_plural: 'NOTE: %s of the items in this batch have approximate dates, which means they can\'t be time shifted. We can time shift the others though, if you wish.',
	
	shown_above: '(Shown above are the first %s of %s items that will be deleted.)',
	
	all_unrotateable: 'Apologies, but all of these photos are temporarily un-rotate-able.',
	some_unrotateable: 'NOTE: 1 of the photos in this batch is temporarily un-rotate-able.<br>We can rotate the others though, if you wish.',
	some_unrotateable_plural: 'NOTE: %s of the photos in this batch are temporarily un-rotate-able.<br>We can rotate the others though, if you wish.',
	
	all_video_unrotateable: 'All of the items in this batch are videos, which cannot be rotated.',
	some_video_unrotateable: 'NOTE: 1 of the items in this batch is a video, which cannot be rotated.<br>We can rotate the other items though, if you wish.',
	some_video_unrotateable_plural: 'NOTE: %s of the items in this batch are videos, which cannot be rotated.<br>We can rotate the other items though, if you wish.',
	
	all_unprintable_videos: 'Sorry, but all of the items in this batch are videos, which cannot be printed.',
	some_unprintable_videos: '<b>Note</b>: One of the items in this batch is a video, which cannot be printed. We can print the photos though.',
	some_unprintable_videos_plural: '<b>Note</b>: Some of the items in this batch are videos, which cannot be printed. We can print the photos though.',

	
	pool_uploads_disabled: 'Uploads disabled',
	pool_uploads_throttled_ever: 'Limit: %s in pool',
	pool_uploads_throttled_day: 'Limit: %s per day',
	pool_uploads_throttled_week: 'Limit: %s per week',
	pool_uploads_throttled_month: 'Limit: %s per month',
	
	batch_start_changing_dates: 'Changing date...',
	batch_start_changing_dates_plural: 'Changing date for %s items...',
	batch_status_changing_dates: 'The dates have been changed...',
	batch_status_changing_dates_plural: 'Changed dates on %s of %s items...',
	batch_end_changing_dates: 'Those dates have been changed.',
	batch_end_changing_dates_plural: 'The dates have changed on those %s items.',
	
	batch_start_printing: 'adding prints to your cart...',
	batch_start_printing_plural: 'adding prints to your cart...',
	batch_status_printing: 'adding prints to your cart...',
	batch_status_printing_plural: 'adding prints to your cart...',
	// no batch_end, because it is a special case
	
	batch_start_adding_tags: 'Adding tags...',
	batch_start_adding_tags_plural: 'Adding tags to %s items...',
	batch_status_adding_tags: 'The tags have been added...',
	batch_status_adding_tags_plural: 'Added tags to %s of %s items...',
	batch_end_adding_tags: 'Tags have been added...',
	batch_end_adding_tags_plural: 'Tags added!',
	
	batch_start_rotating: 'Rotating 1 photo %s...',
	batch_start_rotating_plural: 'Rotating %s photos %s...',
	batch_status_rotating: 'Rotated %s of %s photo %s...',
	batch_status_rotating_plural: 'Rotated %s of %s photos %s...',
	batch_end_rotating: 'Rotated %s photo %s.',
	batch_end_rotating_plural: 'Rotated %s photos %s.',
	
	batch_confirm_rotating_plural: 'Are you sure you want to rotate these %s photos %s? It could take a while.',
	
	batch_start_deleting: 'Deleting...',
	batch_start_deleting_plural: 'Deleting %s items...',
	batch_status_deleting: 'Deleted...',
	batch_status_deleting_plural: 'Deleted %s of %s items.',
	batch_end_deleting: 'Deleted.',
	batch_end_deleting_plural: 'Deleted %s items.',
	
	batch_confirm_deleting: 'You really want to delete this? It will be gone forever, and cannot be recovered.',
	batch_confirm_deleting_plural: 'You really want to delete these %s items? They will be gone forever, and cannot be recovered.',
	batch_confirm_deleting2: 'Are you really, really sure you want to delete this? It will be gone forever, and cannot ever be recovered.',
	batch_confirm_deleting2_plural: 'Are you really, really sure you want to delete these %s items? They will be gone forever, and cannot ever be recovered.',
	
	batch_start_changing_perms: 'Changing permissions on 1 item...',
	batch_start_changing_perms_plural: 'Changing permissions on %s items...',
	batch_status_changing_perms: 'Changed permissions...',
	batch_status_changing_perms_plural: 'Changed permissions on %s of %s items...',
	batch_end_changing_perms: 'Changed permissions.',
	batch_end_changing_perms_plural: 'Changed permissions on %s items.',
	
	
	batch_start_removing_from_group: 'Removing 1 item from the <b>%2$s</b> pool...',
	batch_start_removing_from_group_plural: 'Removing %s items from the <b>%s</b> pool...',
	batch_status_removing_from_group: 'Removed %s of %s items from the <b>%s</b> pool...',
	batch_status_removing_from_group_plural: 'Removed %s of %s items from the <b>%s</b> pool...',
	batch_end_removing_from_group: 'Removed it from the <b>%2$s</b> pool.',
	batch_end_removing_from_group_plural: 'Removed %s items from the <b>%s</b> pool.',
	
	batch_start_adding_to_group: 'Adding 1 item to the <b>%2$s</b> pool...',
	batch_start_adding_to_group_plural: 'Adding %s items to the <b>%s</b> pool...',
	batch_status_adding_to_group: 'Added %s of %s items to the <b>%s</b> pool...',
	batch_status_adding_to_group_plural: 'Added %s of %s items to the <b>%s</b> pool...',
	batch_end_adding_to_group: 'Added it to the <b>%2$s</b> pool.',
	batch_end_adding_to_group_plural: 'Added %s items to the <b>%s</b> pool.',
	batch_end_pending_adding_to_group: 'OK. That\'s been submitted the <b>%2$s</b> group. If is approved by the group administrator, it will show up in the group pool.',
	batch_end_pending_adding_to_group_plural: '%s items have been submitted to the <b>%s</b> group. If they are approved by the group administrator, they will show up in the group pool.',
	
	batch_confirm_adding_to_group: 'You are about to add something private to a group pool. This means that members of %s will be able to view, comment on, tag and add notes to it. Is this OK with you?',
	batch_confirm_adding_to_group_plural: 'You are about to add private items to a group pool. This means that members of %s will be able to view, comment on, tag and add notes to them. Is this OK with you?',
	
	batch_start_adding_to_set: 'Adding to the <b>%2$s</b> set...',
	batch_start_adding_to_set_plural: 'Adding %s items to the <b>%s</b> set...',
	batch_status_adding_to_set: 'Added %s of %s items to the <b>%s</b> set...',
	batch_status_adding_to_set_plural: 'Added %s of %s items to the <b>%s</b> set...',
	batch_end_adding_to_set: 'Added to the <b>%2$s</b> set.',
	batch_end_adding_to_set_plural: 'Added %s items to the <b>%s</b> set.',
	
	batch_start_importing_location: 'Importing location...',
	batch_start_importing_location_plural: 'Importing location for %s items...',
	batch_status_importing_location: 'Imported location...',
	batch_status_importing_location_plural: 'Imported location for %s of %s items...',
	batch_end_importing_location: 'Imported location!',
	batch_end_importing_location_plural: 'Imported location for %s items.',
	
	
	batch_start_saving_location: 'Saving location for 1 item...',
	batch_start_saving_location_plural: 'Saving location for %s items...',
	batch_status_saving_location: 'Saved location!',
	batch_status_saving_location_plural: 'Saved location for %s of %s items...',
	batch_end_saving_location: 'Location saved!',
	batch_end_saving_location_plural: 'Location for %s items saved!',
	
	
	
	batch_confirm_saving_location: '1 of these %s items already has location data. Do you wish to proceed, updating everything with this new location?',
	batch_confirm_saving_location_plural: '%s of these already have location data. Do you wish to proceed, updating everything with this new location?',
	batch_confirm_saving_location_one: 'This already has location data. Do you wish to update it?',
	batch_confirm_saving_location_all: 'These already have location data. Do you wish to update them all?',
	
	batch_alert_saving_location: '<b>Wait a moment!</b><br><br> We recommend that you place items on the map at a higher accuracy level (zoomed in closer). If you drop stuff here, they won\'t be seen as people zoom in, because it\'s not clear where they were actually taken.<br><br>Are you sure you\'d like to drop your stuff here?',
	
	batch_start_removing_location: 'Removing location for 1 item...',
	batch_start_removing_location_plural: 'Removing location for %s items...',
	batch_status_removing_location: 'Location gone!',
	batch_status_removing_location_plural: 'Location for %s of %s items has been removed.',
	batch_end_removing_location: 'Location removed.',
	batch_end_removing_location_plural: 'Location of %s items has been removed.',
	
	batch_confirm_removing_location: 'Are you sure you want to remove the location data?',
	batch_confirm_removing_location_plural: 'Are you sure you want to remove the location data from these items?',
	
	
	
	batch_start_changing_license: 'Changing license...',
	batch_start_changing_license_plural: 'Changing license on %s items...',
	batch_status_changing_license: 'License changed!',
	batch_status_changing_license_plural: 'Changed license on %s of %s items...',
	batch_end_changing_license: 'Changed license on 1 item.',
	batch_end_changing_license_plural: 'Changed license on %s items.',
	
	batch_start_changing_content_type: 'Changing content type...',
	batch_start_changing_content_type_plural: 'Changing content type on %s items...',
	batch_status_changing_content_type: 'Changed content type...',
	batch_status_changing_content_type_plural: 'Changed content type on %s of %s items...',
	batch_end_changing_content_type: 'Changed content type!',
	batch_end_changing_content_type_plural: 'Changed content type on %s items.',
	
	batch_start_changing_safety_level: 'Changing safety level...',
	batch_start_changing_safety_level_plural: 'Changing safety level on %s items...',
	batch_status_changing_safety_level: 'Changed safety level...',
	batch_status_changing_safety_level_plural: 'Changed safety level on %s of %s items...',
	batch_end_changing_safety_level: 'Changed safety level.',
	batch_end_changing_safety_level_plural: 'Changed safety level on %s items.',
	
	batch_start_changing_search_setting: 'Changing search setting on 1 item...',
	batch_start_changing_search_setting_plural: 'Changing search settings on %s items...',
	batch_status_changing_search_setting: 'Changed search setting on 1 of 1 item...',
	batch_status_changing_search_setting_plural: 'Changed search settings on %s of %s items...',
	batch_end_changing_search_setting: 'Changed search setting on 1 item.',
	batch_end_changing_search_setting_plural: 'Changed search settings on %s items.',
	
	batch_canceling: 'Cancelling batch changes...',
	batch_canceled_none_affected: 'The batch was cancelled. Nothing has changed.',
	batch_canceled_some_affected: 'The batch was cancelled, but not before %s of %s items in it were affected.',
	
	add_to_set_added: '<b>1</b> item has been added to your <b>%s</b> set',
	add_to_set_added_plural: '<b>%s</b> items have been added to your <b>%s</b> set',	
	add_to_set_already_in: '(1 item was already in the set)',
	add_to_set_already_in_plural: '(%s items were already in the set)',
	add_to_set_all_in: 'That\'s already in your <b>%s</b> set!',
	add_to_set_all_in_plural: 'Those are already in your <b>%s</b> set!',
	open_set_now: 'Would you like to <b>open up that set now</b>?',
	
	add_to_group_added: 'That\'s been added to the <b>%s</b> pool.',
	add_to_group_added_plural: '<b>%s</b> items have been added to the <b>%s</b> pool.',	
	add_to_group_not_added_no_restrictions: '(1 item was either already in the pool, or is already in too many groups)',
	add_to_group_not_added_plural_no_restrictions: '(%s items were either already in the <b>%s</b> pool, or are already in too many groups)',
	add_to_group_all_not_added_no_restrictions: 'That\'s already in this %s pool, or is in too many groups',
	add_to_group_all_not_added_plural_no_restrictions: 'These are already in the <b>%s</b> pool, or are in too many groups',
	
	add_to_group_not_added: '(1 item was either already in the pool, is already in too many groups, or violates the pool restrictions)',
	add_to_group_not_added_plural: '(%s items were either already in the <b>%s</b> pool, are already in too many groups, or violate the pool restrictions)',					
	add_to_group_all_not_added: 'That item is either already in the %s pool, is already in too many groups, or violates the pool restrictions',
	add_to_group_all_not_added_plural: 'Those items are either already in the <b>%s</b> pool, are already in too many groups, or violate the pool restrictions',
	
	geoperms_not_on_map: '1 item does not appear on the map.',
	geoperms_not_on_map_plural: '%s items do not appear on the map.',
	
	import_geo_failed: 'Import failed for 1 item; failures can occur if something was already imported to the map, or if it did not have recognizable geotags.',
	import_geo_failed_plural: 'Import failed for %s items; failures can occur if something was already imported to the map, or if it did not have recognizable geotags.',
	
		
	add_geo_failed: 'Operation failed.',
	add_geo_failed_plural: 'Operation failed for %s items.',
	add_geo_return: '<br><br>Would you like to return to the <a href="/photo.gne?id=%s">item</a>, or remain on this page?',
	
	add_tags_failed: 'That already has %s tags, the maximum number allowed. So, no more can be added.',
	add_tags_failed_plural: 'These %s items already have %s tags, the maximum number allowed. So, no more can be added.',
	
	filter_failed: 'Operation failed. That\'s has been moderated by Flickr staff, so cannot be changed.',
	filter_failed_plural: 'Operation failed for %s items. They\'ve been moderated by Flickr staff, so cannot be changed.',
	
	too_many_tags: 'You\'ve entered more than %s tags, which is the maximum number allowed.',
	too_many_tags_plural: 'For the photos and videos below you\'ve entered more than %s tags, which is the maximum number allowed.',
	cant_save: 'Can\'t save!',
	
	remove_from_group_email_prompt: 'Would you like to <b>send FlickrMail to %s</b> explaining why you removed something from the pool?',		
	remove_from_group_email_status: 'Sending FlickrMail to: <b>%s</b>',
	remove_from_group_email_subject: 'That\'s been removed from the %s pool',
	remove_from_group_email_body: 'That\'s been removed from the %s group pool.',
	remove_from_group_email_subject_head: 'subject',
	remove_from_group_email_body_head: 'body',
	yes_send_email: 'yes, send email',
	
	map_date_invalid: 'You must specify a real date, not in the future, after 1/1/1970, in the format m/d/y (like 12/26/2003)',
	map_your_groups: 'Your Groups',
	
	taken_date_invalid: 'You must specify a real date, not in the future, after 1825, in the format m/d/y (like 12/26/2003)',
	posted_date_invalid: 'You must specify a real date, not in the future, after the date you joined Flickr (%s), in the format m/d/y (like 12/26/2003)',
	
	together_saving_tags: 'Saving tags...',
	together_saving_tags_plural: 'Saving tags on %s of %s items...',
	
	together_saving_meta: 'Saving title and description...',
	together_saving_meta_plural: 'Saving title and description on %s of %s items...',
	
	together_saved_tags: 'Tags saved!',
	together_saved_tags_plural: 'Tags saved on %s items!',
	
	together_saved_meta: 'Saved title and description.',
	together_saved_meta_plural: 'Saved title and description on %s items.',
	
	together_saved_loading: 'Changes Saved! Loading next page...',
	together_saved: 'Changes Saved!',
	
	together_save_cancelled: 'The save was cancelled.',
	
	together_tags_label: 'Tags',
	together_title_label: 'Title',
	together_description_label: 'Description',
	
	together_need_photos: 'You have to have something in the batch.',
	
	count_photos: '%s item',
	count_photos_plural: '%s items',
	count_photos_here: '1 item here',
	count_photos_here_plural: '%s items here',
	
	count_photos_worldwide: '1 item <a id="a_worldwide_link" href="" onclick="">worldwide</a>.',
	count_photos_worldwide_plural: '%s items <a id="a_worldwide_link" href="" onclick="">worldwide</a>.',
	look_worldwide: '<a id="a_worldwide_link" href="" onclick="">Take a look worldwide?</a>',
	relevant_sort_string: 'View: <strong>Most relevant</strong> &bull; <a href="" onclick="%s">Most recent</a> &bull; <a href="" onclick="%s">Most interesting</a>',
	interesting_sort_string: 'View: <a href="" onclick="%s">Most recent</a> &bull; <strong>Most interesting</strong>',
	recent_sort_string: 'View: <strong>Most recent</strong> &bull; <a href="" onclick="%s">Most interesting</a>',
	
	no_contacts: 'You have no contacts to choose from',
	select_contact: 'Select a Contact',
	no_groups: 'You have no groups to choose from',
	
	
	geotagged_all: 'Everything geotagged',
	geotagged_from_you: 'Your stuff',
	geotagged_from_user: 'Stuff taken by %s',
	geotagged_from_pool: 'from the %s pool',
	geotagged_photos_from_pool: 'Stuff from the %s pool',
	geotagged_matching: 'matching "%s"',
	geotagged_tagged: 'tagged with %a',
	geotagged_in: 'in %s',
	geotagged_taken_range: 'taken <nobr>%s - %s</nobr>',
	geotagged_taken_on: 'taken on <nobr>%s</nobr>',
	geotagged_taken_on_or_before: 'taken on or before <nobr>%s</nobr>',
	geotagged_taken_on_or_after: 'taken on or after <nobr>%s</nobr>',
	geotagged_uploaded_range: 'uploaded <nobr>%s - %s</nobr>',
	geotagged_uploaded_on: 'uploaded on <nobr>%s</nobr>',
	geotagged_uploaded_on_or_before: 'uploaded on or before <nobr>%s</nobr>',
	geotagged_uploaded_on_or_after: 'uploaded on or after <nobr>%s</nobr>',
	no_matches: 'No matches found for',
	looking_at: 'You\'re looking at',
	geotagged_in_set: 'Geotagged stuff in the "%s" set from %s',
	geotagged_one_photo: '"%s" by %s, and other items taken in the area.',
	
	
	
	
	findr_filter_priv_1: 'Only showing public content',
	findr_filter_priv_2: 'Only showing content for friends',
	findr_filter_priv_3: 'Only showing content for family',
	findr_filter_priv_4: 'Only showing content for friends & family',
	findr_filter_priv_5: 'Only showing private content',
	findr_filter_mod_1: 'Only showing safe content',
	findr_filter_mod_2: 'Only showing moderate content',
	findr_filter_mod_3: 'Only showing restricted content',
	
	
	upgrade: 'Upgrade your account...',
	a_gift: 'You can also buy <a id="new_gift_link" href="" onclick="%s">Gift Pro Accounts</a>',
	another_gift: '<a id="new_gift_link" href="" onclick="%s">Add another Gift Pro Account</a>',
	will_expire: '(Account will expire on %s)',
	
	cant_search: 'Darn! Flickr isn\'t smart enough to search %s (yet!). You can reset the form to search more broadly, or just use the controls below to continue browsing.',
	reset_search: 'RESET & SEARCH',
	keep_browsing: 'KEEP BROWSING',

	less_restrictive_full_text: 'Try changing the privacy/SafeSearch filter under "more options" to be less restrictive, or doing a "full text" search',
	less_restrictive: 'Try changing the privacy/SafeSearch filter under "more options" to be less restrictive.',
	
	other_than: 'Try searching for something other than "%s".',
	full_text: 'Try doing a "full text" search.',
	no_photos_found: 'We couldn\'t find anything matching your criteria.',
	
	how_many_selected: '<b>%s</b> selected',
	how_many_selected_plural: '<b>%s</b> selected',
	select_all: 'Select all',
	deselect_all: 'Deselect all',
	clear_selection: 'Clear selection',
	take_a_minute: 'This might take a minute...',

	not_all_saved: 'Not everything was saved!',
	tags_not_saved: 'Tags were not saved because you entered more than %s tags, which is the maximum number allowed.',
	
	
	replace_tag_confirm: 'Are you sure you want to replace %s with %s?',
	
	
	tagrs_tag_not_added: 'Tag not added!',		
	tagrs_tag_not_deleted: 'Tag not deleted!',
	tagrs_max_limit: 'Hey! It looks like you\'re trying to add more than %s tags. Unfortunately, there\'s a limit of %s tags per item.',
	tagrs_click_icon_all_public: 'Click this icon to see everything on Flickr tagged with %s',
	tagrs_delete_this_tag: 'Delete this tag?',
	tagrs_are_you_sure_delete: 'Are you sure you want to delete the tag %s?',
	tagrs_get_more_your_tags: 'get more of your tags',
	tagrs_get_all_your_tags: 'get all of your tags',
	tagrs_tags_not_loaded: 'Tags not loaded!',
	tagrs_choose_from_tags: 'Choose from your tags',

	too_many_contacts: 'Could not make %s a contact. Sadly, you can only have %s non-reciprocal contacts.',

	slideshow_requires_flash: 'Slide shows require you to have installed Macromedia Flash, which you can do <a style="color:#ccc" href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">here</a>.',
	
	
	
	setprint_not_selected_photos: 'You need to choose something to print!',
	setprint_choose_print_size: 'You must choose a print size!',
	setprint_adding_prints_to_cart: 'adding prints to your cart...',
	setprint_added_photos: 'We\'ve added <b>%s</b> of the photos you selected to your cart.',
	setprint_continue_browsing: 'CONTINUE BROWSING',
	setprint_proceed: 'PROCEED TO CART',
	setprint_are_you_ready: 'Or are you ready to place your order?',
	setprint_get_to_cart: 'You can get to your cart anytime by clicking on the cart icon at the top of each page.',
	setprint_were_errors: 'There were errors adding the photos to your cart:',
	setprint_no_photos_large_enough: '<b>No photos in this set are really large enough for this size print.</b>',
	setprint_all_photos_large_enough: '<b>All photos</b> in this set are large enough for this print size.',
	setprint_x_of_y_large_enough: '<b>%s of %s photos</b> in this set are large enough for this print size.',



	setorder_set_has_no_photos: 'Hrmm. This set appears to be empty.',
	setorder_reverting: 'reverting...',
	setorder_reordering: 're-ordering...',
	setorder_saving: 'saving...',
	setorder_order_you_want: 'Is this the ordering you want?',
	setorder_ok_button: 'YES, SAVE',
	setorder_cancel_button: 'NO, CANCEL',
	setorder_set_been_reordered: 'Your set has been re-ordered.',



	pinwin_uploaded_details: 'Uploaded on <a class="Plain" href="/photos/%s/archives/date-posted/%s/%s/%s/" target="_new">%s</a><br>by <a href="/photos/%s/" target="_new" class="Plain"><b>%s</b></a>',
	pinwin_only_you: 'Only you can see this on the map',
	pinwin_only_contacts: 'Only contacts can see this on the map',
	pinwin_only_friends: 'Only friends can see this on the map',
	pinwin_only_family: 'Only family can see this on the map',
	pinwin_only_friends_and_family: 'Friends & family see this on the map',
	pinwin_anyone: 'Anyone can see this location',
	pinwin_problem_loading_info: 'There was a problem loading info:',
	pinwin_move_photos_to_location: 'move to this location',
	pinwin_add_to_location: 'add to this location',
	pinwin_from_user: 'from <a href="/photos/%s/" target="_new" class="Plain" >%s</a>',



	photo_create_new_one: 'You haven\'t created any<br>photo sets yet. You can<br><a href="" onclick="_ge(\'%s\').show_new_set_form();return false;">create one now</a> if you like.',
	photo_dont_belong: 'You don\'t belong to any<br>groups yet. You can find<br>and create groups <a href="/groups/">here</a>.',
	photo_configure_blog_now: 'You haven\'t configured<br>a blog to post to yet.<br>Why not <a href="/blogs_add.gne?extra=photo%s">do that now</a>?',
	photo_loading_print_options: '<br>Loading print options...<br><br>',
	photo_printing_services_provided_by: 'Flickr Printing services are provided by EZPrints. When you\'ve finished collecting up the photos you want to print, click on the cart icon to finalize you order.',

	photo_what_set: 'set',
	photo_what_set_plural: 'sets',
	photo_what_group: 'group',
	photo_what_group_plural: 'groups',
	photo_what_blog: 'blog',
	photo_what_blog_plural: 'blogs',
	photo_what_print: 'print',
	photo_what_print_plural: 'prints',

	photo_loading_what: '<br>loading %s...<br><br>',
	photo_loading_what_set: '<br>loading sets...<br><br>',
	photo_loading_what_group: '<br>loading groups...<br><br>',
	photo_loading_what_blog: '<br>loading blogs...<br><br>',
	photo_loading_what_print: '<br>loading prints...<br><br>',
	photo_loading_what_gallery: '<br>loading galleries...<br><br>',
	photo_create_new_set: 'CREATE NEW SET',
	photo_create_new_gallery: 'Create a new gallery',
	photo_title: 'Title:',
	photo_description: 'Description:',
	photo_choose_a_set: 'Choose a set below:',
	photo_choose_a_set_or: 'Choose a set below (or <a href="" onclick="%s">create a new set</a>).',
	photo_choose_a_gallery_or: 'Choose a gallery below (or <a href="" onclick="%s">create a new gallery</a>).',
	photo_create_new_set: 'create a new set',
	photo_create_new_set_ups: 'Create a new set:',
	photo_choose_a_size: 'Choose a print size & quantity:',
	photo_choose_a_what: 'Choose a %s below:',
	photo_choose_a_what_set: 'Choose a set below:',
	photo_choose_a_what_group: 'Choose a group below:',
	photo_choose_a_what_blog: 'Choose a blog below:',
	photo_choose_a_what_print: 'Choose a print below:',
	photo_choose_a_what_gallery: 'Choose a gallery below:',
	photo_must_enter_set_title: 'You must enter a title for the new set. Otherwise, what would it be titled?',
	photo_must_enter_gallery_title: 'You must enter a title for the new gallery. Otherwise, what would it be titled?',
	photo_private_photo_to_group: 'You are about to add something private to a group. This means that members of <b>%s</b> will be able to view, comment on, tag and add notes to it. Is this OK with you?',
	photo_adding_prints_to_cart: 'Adding prints to cart...',
	photo_removing_photo_from_what: 'Removing from %s...',
	photo_removing_photo_from_what_set: 'Removing from set...',
	photo_removing_photo_from_what_group: 'Removing from group...',
	photo_removing_photo_from_what_blog: 'Removing from blog...',
	photo_creating_new_what: 'Creating new %s...',
	photo_creating_new_what_set: 'Creating new set...',
	photo_creating_new_what_group: 'Creating new group...',
	photo_creating_new_what_blog: 'Creating new blog...',
	photo_adding_photo_to_what: 'Adding to %s...',
	photo_adding_photo_to_what_set: 'Adding item to set...',
	photo_adding_photo_to_what_group: 'Adding to group...',
	photo_adding_photo_to_what_blog: 'Adding to blog...',
	photo_adding_some_errors: 'We\'ve added some prints of <b>%s</b> to your cart, but there were errors adding %s of the prints. The last error was: <b>%s</b><br><br>',
	photo_added_prints_to_cart: 'We\'ve added these prints of <b>%s</b> to <b><a href="%s">your cart</a></b>:\'',
	photo_continue_browsing: 'CONTINUE BROWSING',
	photo_proceed: 'PROCEED TO CART',
	photo_or_are_you_ready: 'Or are you ready to place your order?',
	photo_get_to_cart: 'You can get to your cart anytime by clicking on the cart icon at the top of each page.',
	photo_go_to_cart: 'GO TO CART',
	photo_errors_adding_prints: 'There were errors adding the prints to your cart. The last error was:',
	photo_removed_from_set: 'That\'s been removed from your <b><a href="%ssets/%s/">%s</a></b> set!',
	photo_removed_from_pool: 'That\'s been removed from the <b><a href="/groups/%s/pool/">%s</a></b> group.',
	photo_removed_from_gallery: 'That\'s been removed from your <b><a href="%sgalleries/%s/">%s</a></b> gallery!',
	photo_added_to_set: 'That\'s been added to your <b><a href="%ssets/%s/">%s</a></b> set.',
	photo_added_to_gallery: 'That\'s been added to your <b><a href="%sgalleries/%s/">%s</a></b> gallery.',
	photo_not_added_to_pool_restrictions: 'This item could not be added to the <b><a href="/groups/%s/pool/">%s</a></b> group because it violates the pool rules.',
	photo_added_to_pool: 'That\'s been added to the <b><a href="/groups/%s/pool/">%s</a></b> group.',
	photo_added_to_pool_pending: 'OK! That\'s been submitted to the <b><a href="/groups/%s/pool/">%s</a></b> group. If it is approved by the group administrator, it will show up in the group pool.',
	photo_added_to_pool_already_pending: 'Bzzt! That\'s already been submitted to the <b><a href="/groups/%s/pool/">%s</a></b> group.',
	photo_adding_disabled: 'Adding items to %s has been disabled.',
	photo_limits_1: 'You can only add %s items to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_2: 'You can only add %s item to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_3: 'You can only add %s items per %s to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_4: 'You can only add %s item per %s to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	
	photo_limits_3_day: 'You can only add %s items per day to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_3_week: 'You can only add %s items per week to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_3_month: 'You can only add %s items per month to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_4_day: 'You can only add %s item per day to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_4_week: 'You can only add %s item per week to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	photo_limits_4_month: 'You can only add %s item per month to %s. (You\'ve already added %s.) Remove something from the pool if you really want to add this.',
	

	photo_see_group_for_info: 'See the <b><a href="%s/groups/%s/">%s</a></b> group page for more information.',
	photo_max_groups: 'This is already in the maximum number of groups allowed (the limit is %s groups). To add it to <b>%s</b>, you will first have to remove it from at least one other group.',
	photo_added_to_set2: 'This has been added to a new set titled <b><a href="%s">%s</a></b>.',
	photo_added_to_gallery: 'This has been added to a new gallery titled <b><a href="%s">%s</a></b>.',
	photo_apologize: 'We do apologize...',
	photo_first_things_first: 'First things first!',
	photo_setting_country: 'setting your country...',
	photo_we_recommend: 'We recommend a minimum photo resolution of %s x %s pixels.',
	photo_are_you_sure: 'Are you sure you want to remove this from <b>%s</b>?',
	photo_remove_from_set: 'Remove this from your %s set',
	photo_remove_from_gallery: 'Remove this from your %s gallery',
	photo_remove_from_pool: 'Remove this from the %s pool',
	photo_select_a_group: 'Select a group',
	photo_already_invited: 'already invited',

	photo_geo_error_need_default: '<p>Before you can assign location information to something you must define your default location privacy settings. That\'s not as scary as it sounds!</p><p>You can do it <a href=\'/account/geo/privacy/\'>over here</a></p>',


	loc_results_no_matches: 'No results found',
	loc_results_one_match: 'We found <b>1</b> match:',
	loc_results_matches: 'We found <b>%s</b> matches for "%s"',
	loc_results_more: 'More results...',


	loc_results_take_you_there: '(We\'ll take you there now...)',
	loc_results_zero_second: '(We\'ll take you there in 0 seconds...)',
	loc_results_one_second: '(We\'ll take you there in 1 second...)',
	loc_results_x_second: '(We\'ll take you there in %s seconds...)',

	photo_notes_rotate: 'Rotating photo...',
	photo_notes_one_note: 'You can only add one note at a time.',
	photo_notes_add_notes_here: 'Add your note here.',
	photo_notes_saving_note: 'Saving new note...',
	photo_notes_deleting: 'Deleting note...',



	photo_mini_map_more_photos: 'more here',
	photo_mini_map_view_on_map: 'View %s map',



	photo_buttons_are_you_sure: 'Are you sure you want to delete this? (This cannot be undone.)',
	photo_buttons_removing: 'Removing from favorites',
	photo_buttons_adding: 'Adding to favorites',


	personmenu_buddyicon: 'can\'t find buddyicon data for NSID',
	personmenu_contactChangerText1_ff: '%s is marked as <b>friend</b> and <b>family</b>.',
	personmenu_contactChangerText1_fri: '%s is marked as your <b>friend</b>.',
	personmenu_contactChangerText1_fam: '%s is marked as <b>family</b>.',
	personmenu_contactChangerText1_con: '%s is currently your <b>contact</b>.',
	
	personmenu_contactChangerText2_ff_m: 'You can remove %s from your list of friends, or remove him from your list of family (in either case he will remain a contact of yours).',
	personmenu_contactChangerText2_ff_f: 'You can remove %s from your list of friends, or remove her from your list of family (in either case she will remain a contact of yours).',
	personmenu_contactChangerText2_ff_o: 'You can remove %s from your list of friends, or remove them from your list of family (in either case they will remain a contact of yours).',

	personmenu_contactChangerText2_fri_m: 'You can add %s to your list of <i>family</i>, or remove him as a friend (he will remain a contact of yours).',
	personmenu_contactChangerText2_fri_f: 'You can add %s to your list of <i>family</i>, or remove her as a friend (she will remain a contact of yours).',
	personmenu_contactChangerText2_fri_o: 'You can add %s to your list of <i>family</i>, or remove them as a friend (they will remain a contact of yours).',

	personmenu_contactChangerText2_fam_m: 'You can add %s to your list of <i>friends</i>, or remove him from your list of family (he will remain a contact of yours).',
	personmenu_contactChangerText2_fam_f: 'You can add %s to your list of <i>friends</i>, or remove her from your list of family (she will remain a contact of yours).',
	personmenu_contactChangerText2_fam_o: 'You can add %s to your list of <i>friends</i>, or remove them from your list of family (they will remain a contact of yours).',

	personmenu_contactChangerText2_con_o: 'You can add %s to your list of <i>friends</i> or <i>family</i> (or both).',

	personmenu_contactChangerText3: 'Or, <a href="#" onclick="icon_removeContact(\'%1$s\'); return false;">remove</a> %2$s completely from your contacts.',
	
	personmenu_contactChangerText1_notcon: '%s will be <b>added</b> as your contact.',
	personmenu_contactChangerText2_notcom: 'You can also add %s to your list of <i>friends</i> or <i>family</i> (or both).',
	personmenu_contactChangerText3_notcon: '<i>Marking them as friend or family is optional. It can also be changed at any time.</i>',
	
	personmenu_working: 'Working...',
	personmenu_success: 'Success',
	personmenu_failure: 'Failure',

	personmenu_change: 'Change',

	personmenu_updatecontact_ff_m: 'He\'s a friend and family. %s',
	personmenu_updatecontact_ff_f: 'She\'s a friend and family. %s',
	personmenu_updatecontact_ff_o: 'They\'re a friend and family. %s',

	personmenu_updatecontact_fri_m: 'He\'s a friend of yours. %s',
	personmenu_updatecontact_fri_f: 'She\'s a friend of yours. %s',
	personmenu_updatecontact_fri_o: 'They\'re a friend of yours. %s',

	personmenu_updatecontact_fam_m: 'He\'s family. %s',
	personmenu_updatecontact_fam_f: 'She\'s family. %s',
	personmenu_updatecontact_fam_o: 'They\'re family. %s',

	personmenu_updatecontact_con_m: 'He\'s one of your contacts. %s',
	personmenu_updatecontact_con_f: 'She\'s one of your contacts. %s',
	personmenu_updatecontact_con_o: 'They\'re one of your contacts. %s',

	personmenu_updatecontact_notcon_m: 'Add him as a contact?',
	personmenu_updatecontact_notcon_f: 'Add her as a contact?',
	personmenu_updatecontact_notcon_o: 'Add them as a contact?',

	personmenu_hiyou: 'Hi, you.',
	personmenu_add_as_contact: 'Add <strong>%s</strong> as a contact?',
	personmenu_block: 'Block <b>%s</b>',
	personmenu_unblock: 'Unblock <b>%s</b>',

	personmenu_are_blocking: 'You are blocking %s',
	personmenu_is_ff: '<strong>%s</strong> is friends and family. %s',
	personmenu_is_fri: '<strong>%s</strong> is a friend. %s',
	personmenu_is_fam: '<strong>%s</strong> is family. %s',
	personmenu_is_con: '<strong>%s</strong> is a contact. %s',

	personmenu_as_ff: '%s counts you as friends and family.',
	personmenu_as_fri: '%s counts you as a friends.',
	personmenu_as_fam: '%s counts you as family.',
	personmenu_as_con: '%s counts you as a contact.',




	one_photo_edit_loading_info: 'Loading info...',
	one_photo_edit_problem_loading: 'There was a problem loading info: %s',
	one_photo_edit_sets_title: '<b>Sets:</b><br>',
	one_photo_edit_groups_title: '<br><b>Groups:</b><br>',
	one_photo_edit_none: '--none--<br>',
	one_photo_edit_plural_photos: '%s items',
	one_photo_edit_single_photo: '1 item',

	one_photo_edit_limit: 'Limit:',
	one_photo_edit_no_longer_member: '<i>you no longer belong to this group</i>',
	one_photo_edit_photo_changed: 'Something\'s changed...',
	one_photo_edit_really_delete: 'You really want to delete this photo? It will be gone forever, and cannot be recovered.',
	one_photo_edit_really_delete_video: 'You really want to delete this video? It will be gone forever, and cannot be recovered.',
	one_photo_edit_no: 'no!',
	one_photo_edit_deleting: 'Deleting item...',
	one_photo_edit_nothing_saved: 'nothing saved',
	one_photo_edit_saving: 'Saving...',





	nextprev_goto_prev: 'Previous in the %s',
	nextprev_goto_next: 'Previous in the %s',




	mat_batch_drag_photos: 'Drag items here to edit them as a batch.',
	mat_batch_you_can: 'You can then change any attributes or create a new set.',
	mat_batch_photos_no_no: 'You don\'t appear to have uploaded anything to Flickr...',
	mat_batch_recently: 'Loading recently uploaded items from <b>%s</b>...',
	mat_batch_loading_untagged: 'Loading untagged items...',

	mat_batch_added_plural: '%s items were added to the batch!',
	mat_batch_added_single: '1 item added to the batch!',
	mat_batch_notadded_plural: '%s items were already in the batch.',
	mat_batch_notadded_single: 'That was already in the batch.',

	mat_batch_photos_already_plural: 'Those are already in the batch.',
	mat_batch_photos_already_single: 'That\'s already in the batch.',
	mat_batch_add_to_batch: 'add to batch',


	mat_groups_msg1: 'You don\'t yet belong to any groups.',
	mat_groups_msg2: 'Check out the <a class="Plain" target="_new" href="/groups/">Groups page</a> to find out how to<br>create and join groups for sharing.',
	mat_groups_building_interface: 'Building interface for <br>1 of %s groups...',
	mat_groups_enabling_interface: 'Enabling interface for <br>%s of %s groups...',
	mat_group_admin: 'You\'re an admin of this group',
	mat_group_member: 'You\'re a member of this group',
	mat_group_public: 'This group is public',
	mat_group_private: 'This group is private',
	mat_group_photo: 'item',
	mat_group_photo_plural: 'items',
	mat_group_tuna: 'Configuring Tuna Blaster...',
	mat_group_photos_plural: '%s items',
	mat_group_photos_single: '1 item',
	mat_group_wont_work: 'There are unsaved changes, so that won\'t work :)',
	mat_group_add_to: 'add to <b>%s</b>',




	mat_one_group_loading: 'Loading group...',
	mat_one_adding_plural: 'Adding stuff to pool...',
	mat_one_adding_single: 'Adding that to pool...',
	mat_one_loading_page: 'Loading page %s...',
	mat_one_msg1: 'You have nothing in this group pool.',
	mat_one_msg2: '',
	mat_one_msg3: 'Uploads have been disabled for this group',
	mat_one_msg4: '',
	mat_one_msg5: 'Drag items here to add them to the group pool',
	mat_one_msg6: 'Drag something to the bottom to remove it from the pool.',
	mat_one_could_not_load: 'could not load set contents: %s',
	mat_one_photos_already_plural: 'Those are already in this group.',
	mat_one_photos_already_single: 'That\'s already in this group.',
	mat_one_photos_plural: '%s items',
	mat_one_photos_single: '1 item',
	mat_one_group_admin: 'You\'re an admin of this group',
	mat_one_group_member: 'You\'re a member of this group',
	mat_one_group_moderator: 'You\'re a moderator of this group',
	mat_one_group_public: 'This group is public',
	mat_one_group_private: 'This group is private',
	
	mat_one_open_group_page: 'Open group page',
	mat_one_show_only_my: 'show only my stuff',
	mat_one_remove_from_pool: 'remove it from pool',
	mat_one_are_you_sure: 'Are you sure you want to remove this from the <b>%s</b> group pool?<br><br>',
	mat_one_able_to_send_notes: '(You\'ll be able send a note to <b>%s</b> on the next screen, if you\'d like. That\'s the owner.)<br>',
	mat_one_remove_it: 'remove it',




	new_set: 'new set',
	mat_set_msg1: 'Click the "create new set" button to get started,',
	mat_set_msg2: 'or drag stuff here to create a new set.',
	mat_set_reloading_set: 'Reloading sets...',
	mat_set_already_in_collection: 'that set is already in the collection',
	mat_set_free: 'Free account holders such as yourself are limited to only 3 sets. Find out how to upgrade to a Pro account <a target="_new" href="/upgrade/">here</a>, so you can have all the sets you like.',
	mat_set_error: 'There was an error and changes were not saved: %s',
	mat_set_wont_work: 'There are unsaved changes, so that won\'t work :)',
	
	
	mat_one_set_loading_set: 'Loading set...',
	mat_one_set_adding_photos_plural: 'Adding to set...',
	mat_one_set_adding_photos_single: '',
	mat_one_set_msg1: 'Drag stuff here to add it to the set',
	mat_one_set_msg2: 'You can drag them around to re-order them.',
	mat_one_set_could_not_load: 'could not load set contents: %s',
	mat_one_set_need_more_photos: 'You need two items in the set before you can sort it.',
	mat_one_set_is_this_right: 'Is this the ordering you want?',
	mat_one_set_been_added_to_set: 'been added to a new set! Now just give the set a title and description and hit the "save" button. (Or drag some more photos in first!)',
	mat_one_set_photo_has_plural: 'These have %s',
	mat_one_set_photo_has_single: 'This has %s',
	mat_one_set_new_empty_set: 'A new empty set has been created! Now just drag some stuff into it, give the set a title and description and hit the "save" button.',
	mat_one_set_added_plural: '%s items were added to the set!',
	mat_one_set_added_single: '1 item was added to the set!',

	mat_one_set_already_plural: '%s items were already in the set.',
	mat_one_set_already_single: '1 item was already in the set!',

	mat_one_set_already_plural2: 'Those are already in the set.',
	mat_one_set_already_single2: 'That\'s already in the set.',
	mat_one_set_photo_in_set: '<b>1</b> item in the set',
	mat_one_set_photos_in_set: '<b>%s</b> items in the set',
	mat_one_set_sure: 'Do you really want to delete this set? (Don\'t worry, none of the contents will be deleted.)',
	mat_one_set_no: 'no!',
	mat_one_set_deleting: 'Deleting set...',
	mat_one_set_not_a_great_name: '\'%s\' is not a great name for a set. Can you think of a better one, friend?',
	mat_one_set_try: 'I\'ll try',
	mat_one_set_need_title: 'I can\'t save the set unless you give it a title!',
	mat_one_set_ok_cheeky: 'ok, cheeky',
	mat_one_set_saving: 'Saving...',
	mat_one_set_error: 'There was an error and the set was not deleted: %s',
	mat_one_set_create_error: 'There was an error and the set was not created: %s',
	mat_one_set_change_error: 'There was an error and changes were not saved: %s',
	mat_one_set_photos_error: 'There was an error and photos were not saved: %s',
	mat_one_set_deleted: 'Set deleted! ',
	mat_one_set_created: 'Set created! ',
	mat_one_set_changes_saved: 'Changes saved! ',
	mat_one_set_has_changed: 'A set has changed',
	mat_one_set_make_primary: 'make this the set thumbnail',




	interetpop_msg: 'You are looking at some of the <a href="" id="intrestpop_day_link2">interesting stuff from <b><span id ="intrestpop_day_text"></span></b></a>.',




	fumb_drag_x_photos: '%s items',
	fumb_drag_move_to_end: 'move to end',




	grouppool_are_you_sure: 'Are you sure you want to remove this from the pool?',
	grouppool_sorry_not_remove: 'Sorry, that could not be removed from the pool',
	grouppool_see_all_link_plural: '(<a id="a_see_all" href="/groups/%s/pool/">See %s photostream</a>)',
	grouppool_see_all_link_single: '(<a id="a_see_all" href="/groups/%s/pool/">See this</a>)',
	grouppool_see_no_link_plural: '(See all %s items)',
	grouppool_see_no_link_single: '(See that)',
	grouppool_remove_photo: 'Remove this item from the pool',
	grouppool_new: 'NEW',
	grouppool_from: 'From <a href="/photos/%s/">%s</a>',




	global_working: 'working...',
	global_unsaved: 'You have unsaved changes.',
	
	
	
	
	findr_fewer: 'Fewer options',
	findr_tagged_with: 'tagged with <b>%s</b>',
	findr_matching: 'matching <b>%s</b>',
	findr_loading_photos: 'Loading photos...',
	findr_loading_photos_videos: 'Loading photos & videos...',
	findr_loading_videos: 'Loading videos...',
	findr_no_groups: 'you belong to no groups',
	findr_select_a_group: 'select a group...',
	findr_no_sets: 'you have no sets',
	findr_select_a_set: 'select a set...',
	findr_untagged: 'untagged stuff',
	findr_geotagged: 'geotagged items',
	findr_ungeotagged: 'non-geotagged stuff',
	findr_y_photos: 'photos imported from Yahoo! Photos',
	findr_in_your: 'in your %s',
	findr_within_set: 'within a set',
	findr_within_batch: 'within a batch',
	findr_within_group: 'within a group',
	
	findr_of: 'of your photostream',
	findr_of_items: 'items',
	findr_not_in_set: 'items not in a set',
	findr_in_upload_day: 'items uploaded on <b>%s</b>',
	findr_in_set: 'stuff in the <b>%s</b> set',
	findr_in_batch: 'items from a batch',
	findr_in_group: 'items in the <b>%s</b> group',





	insitu_click_to_edit: 'Click to edit',
	insitu_click_to_add_title: 'click here to add a title',
	insitu_click_to_add_description: 'click here to add a description',
	insitu_click_to_add_blast: 'Admins: Click to add an announcement to all group members (500 characters max)',
	insitu_click_to_add_blast_spon: 'Admins: Click to add an announcement to all group members',
	insitu_saving: 'saving...',
	insitu_unknown_hash: 'unknown hash',
	insitu_description_error: 'Error: your description was NOT saved.',
	insitu_error_no_hash: 'ERROR: no hash ob exists for %s',
	insitu_error_title_not_saved: 'Error: your title was NOT saved. %s',





	map_searching: 'Searching',
	map_loading: 'Loading',
	map_prefs: '<h3>Hi. We need to tell you something.</h3><p>When you add stuff to this map, information about<br />where they were taken can be made available.</p><p>Have a think about what you\'d usually be comfortable with,<br />and use the form below to choose a <strong>default</strong> level of privacy<br />for the location information for whatever you place on a map.</p><p>(You can change location privacy on a item-by-item basis<br />later if you wish.)</p><p><strong>By default, who can see <u>where</u> your stuff was taken?</strong></p>',
	map_only_you: 'Only You',
	map_f_and_f: 'Your Friends and/or Family',
	map_fam: 'Your Family',
	map_fri: 'Your Friends',
	map_contacts: 'Your Contacts',
	map_anyone: 'Anyone (%s)',
	map_set_permission: 'SET DEFAULT PERMISSION',
	map_saving_prefs: 'Saving preference...',
	map_recommended: 'Recommended',


	map_prefs_saved: '<b>Preference saved!</b><br /><br /><b>%s</b> will be able to see where your stuff were taken, but you can change that for any individual item, or for a batch.',
	map_prefs_saved_2: '<b>Preference saved!</b><br /><br /><b>%s</b> will be able to see where your stuff was taken, but you can change that for any individual item, or for a batch.',
	map_msg2: '<br><br>Now, we notice that you have <b>%s</b> items with geotags... Would you like us to place them on the map for you?',
	map_yes_place: 'Yes! Place them on the map',
	map_loading_geotagged: 'Loading geotagged bits...',
	map_link_to_map: 'Link to this map',
	map_C_P: 'Copy and paste the URL below:',
	map_on_page: 'You\'re on page',
	map_loading: 'Loading the first<br>page...',
	map_loading_page: 'Loading page...',
	map_more_than: 'More than %s items',
	map_x_photos_here: '%s items taken here',
	map_1_photo_here: '1 item taken here',

	map_page_x_of_y: '%1$s <span style="font-weight:normal; font-size:11px;">of</span> %2$s',


	page_groups_view_add_ann: 'Admins: Click to add an announcement to all group members (500 characters max)',
	page_groups_view_admin_says: '%s (a group admin) says:',

	page_groups_edit_confirm_del_en: 'Are you sure you want to delete the English translation?',
	page_groups_edit_confirm_del_fr: 'Are you sure you want to delete the French translation?',
	page_groups_edit_confirm_del_de: 'Are you sure you want to delete the German translation?',
	page_groups_edit_confirm_del_es: 'Are you sure you want to delete the Spanish translation?',
	page_groups_edit_confirm_del_it: 'Are you sure you want to delete the Italian translation?',
	page_groups_edit_confirm_del_pt: 'Are you sure you want to delete the Portuguese translation?',
	page_groups_edit_confirm_del_ko: 'Are you sure you want to delete the Korean translation?',
	page_groups_edit_confirm_del_zh: 'Are you sure you want to delete the Traditional Chinese translation?',

	global_sure: 'Are you sure?',
	global_sorry: 'Sorry, that could not be deleted.',

	remove_or_move_set: 'You dragged the set <b>%s</b> from the <b>%s</b> collection to the <b>%s</b> collection.<br><br>Do you want to remove the set from the <b>%s</b> collection after moving it?<br><br><input type="checkbox" id="set_remove_cb" onchange="_ge(\'collections_plate\').remember_set_remove = (this.checked);"><label for="set_remove_cb" style="font:12px arial, sans-serif; color:#707070">Remember this choice for the rest of this session?</label><br><br>',
	
	colls_must_first_drag: 'You must first drag collections or sets into this collection! You can\'t build an mosaic for a collection that does not have any sets in it.',
	colls_must_have_sets: 'You can\'t make a mosaic for a collection until it or one of the collections within it contains some sets!',
	colls_move_or_delete_all: 'Your <b>%s</b> collection contains other collections. would you like to move them out of <b>%s</b>, or just delete them all?',
	colls_confirm_delete: 'Are you sure you want to delete your <b>%s</b> collection? (Don\'t worry, no sets or photos will be deleted.)',
	colls_drag_to_delete: 'Drag a collection here to delete it.',
	colls_drag_to_remove: 'Drag a set here to remove it from the collection.',
	collection_count_plural: '%s collections',
	collection_count: '1 collection',
	set_count_plural: '%s sets',
	set_count: '1 set',
	colls_drag_here_to_add: '(drag sets or collections here to add them)',
	colls_menu_edit_meta: 'Edit title and description',
	colls_menu_edit_iconb: 'Edit collection mosaic',
	colls_menu_create_iconb: 'Create collection mosaic',

	colls_menu_add: 'Add a new collection here',
	colls_menu_open: 'Open collection page',
	colls_menu_delete: 'Delete collection',
	colls_button_create_iconb: 'CREATE MOSAIC',
	
	colls_create_new: 'Create a new collection:',
	colls_select_parent: 'Where do you want to place the new collection?',
	colls_at_root: 'at the root',
	colls_choose_a_set: 'choose a set',
	colls_load_findr: 'You can load the contents of your sets in the findr',
	colls_created_mosaic: 'Created mosaic for: <b>%s</b>',
	colls_saving_mosaic: 'Saving mosaic...',
	colls_creating_mosaic: 'Creating mosaic...',
	colls_loading_mosaic: 'Loading mosaic...',
	colls_edit_mosaic: 'Edit mosaic for: <b>%s</b>',
	
	colls_mosaic_was_created: 'A new collection mosaic was created! You can edit it now, if you like.',		
	colls_retrieving_photos: 'Retrieving...',
	colls_deleted_photos: 'It looks like you\'re trying to save a mosaic with something missing This can happen if you delete a thumbnail that has previously been used in a mosaic. To fix, simply drag a new photo up from the findr to replace the missing bits.',
	colls_saving_changes: 'Saving changes...',
	colls_creating_new: 'Creating new collection...',
	colls_drag_intruct: 'Drag images around the grid to rearrange them:',
	colls_randomize: 'You can <a href="" onclick="_ge(\'collection_pop\').pop_randomate_iconb();return false">randomize the collection mosaic</a>.',
	colls_preview: 'Mosaic preview:',
	colls_replace_intruct: 'Replacement images can be dragged up from the findr below.',
	colls_happy: 'Happy with that?',




	iconmaker_instructions: 'To the left is what your buddy icon will look like. You can drag around and resize the square below to get it just how you like it. When you are happy with your icon, click the pink button to the right.',
	iconmaker_constrain: 'constrain selection to square',
	iconmaker_make: 'make the icon',
	iconmaker_error: '<b>ERROR:</b> unable to load image.',



	map_add_bookmark_here: 'Add bookmark here',
	map_your_bookmark_is_here: 'Your \'<strong>%s</strong>\' bookmark is here.',
	map_aggh_too_many_bookmarks: 'Reached maximum bookmark limit (16)',
	map_drat: 'Drat!',



	processing: 'Processing %s of %s',

	slideshow_paused: 'Currently paused.',
	slideshow_fast: 'fast',
	slideshow_med: 'medium',
	slideshow_slow: 'slow',
	slideshow_end1: 'End of show reached.',
	slideshow_end2: 'Now looping from the beginning.',
	slideshow_loop1: 'Replaying last %s bits.',
	slideshow_restart: 'Click here to resume your show.',
	slideshow_none: 'We couldn\'t find anything.',
	slideshow_add_to_faves: 'Add to faves',
	slideshow_a_fave: 'A fave',
	slideshow_no_title: 'No title',




	order_gift: 'Gift',
	order_gift_full: 'A gift pro account',
	order_wait: 'ONE SECOND PLEASE...',
	must_agree: 'You must agree to the Terms & Conditions!',
	order_1_year: 'A <strong>1 year</strong> account',
	order_2_year: 'A <strong>2 year</strong> account',
	order_3_months: '3 months',
	order_6_months: '6 months',
	order_bonus_pro_title: 'Free pro for you',
	order_agreement: '<label for="gift_terms_cb">I acknowledge that I have read, understand, and agree to those surprisingly short Flickr Gift </label><a href="/gift_terms_purchaser.gne" target="_new" onclick="window.open(\'/gift_terms_purchaser.gne\',\'gift_terms_p\',\'status=yes,scrollbars=yes,resizable=yes,width=600,height=480\'); return false">Terms & Conditions</a>',
	order_stats_title: 'Account Stats <span class="new">BONUS</span>',
	order_stats_subtitle: 'Graph views, see trends, and find referrers',
	order_stats_provided_by: 'Provided by Flickr',
	order_for: 'for %s',
	order_pro_account: 'Pro Account',
	
	order_agreement_prefix: 'Terms and Conditions are applied to Flickr Gift Certificates',
	order_enter_name: 'or enter a <b>Screen Name:</b>',
	order_too_many_matches: 'There are loads of matches for <b>%s</b>. You need to refine your seach a bit.',
	order_error_search: 'There was an error performing your search:',
	order_no_matches: 'No results found for <b>%s</b>.',
	order_add: 'ADD',


	map_geobookmark_rm: 'Delete "%s", are you sure?',
	map_bookmark_this_map_view: 'Save this map view',
	map_give_it_a_label: 'Give it a label:',
	map_really_give_it_a_label: '<span style="color:red; font-style: italic">No really</span>, give this view a label:',
	map_here_be_dragons: 'Here be Dragons',
	map_bmk_error: 'Error:',
	map_oh_ok: 'Oh, OK',
	map_retry: 'Retry',


	global_plus_geo_select_bmk: 'Select a bookmark',
	global_plus_geo_kinda_found_stuff: 'The location you entered is too general for us to use. Try entering a street name or an actual address (<a class="Plain" onclick="window.open(\'/geoformats.gne\',\'geoformat\',\'status=yes,scrollbars=yes,resizable=yes,width=400,height=580\'); return false" href="/geoformats.gne">Some examples</a>).',
	global_plus_geo_no_matches_for: 'We can\'t find any matches for <i>%s</i>. Try another search term.',
	global_plus_geo_no_geo_bookmark_data_for_with_path: 'We found <a href="%s">%s</a> but it didn\'t have any location information',
	global_plus_geo_no_geo_bookmark_data_for: 'We found %s but it didn\'t have any location information',
	global_plus_geo_search_results: 'Search results:',
	global_plus_geo_found_or_go_back: 'Or go ',
	global_plus_geo_more_results: 'More results...',
	global_plus_geo_map: 'map',

	global_plus_geo_yeah_ok_found_stuff: '<strong>But, wait!</strong> The location you entered is a bit general.<br /><br />You could <a href="%s" class="Plain">pop over to the map</a> for a bit of fine tuning, or just... <br /><br />',
	global_plus_geo_yeah_ok_hint_found_stuff: '(<a class="Plain" onclick="window.open(\'/geoformats.gne\',\'geoformat\',\'status=yes,scrollbars=yes,resizable=yes,width=400,height=580\'); return false" href="/geoformats.gne">Some helpful examples</a>).',
	global_plus_geo_one_match: 'We found 1 match...',
	global_plus_geo_found_x_matches: 'We found <strong>%s</strong> matches. Please select one...',



	group_manage_photo_remove: 'Also remove %s items?',
	
	slideshow_help: 'Help',
	slideshow_options: 'Options',
	slideshow_options_head: 'Options for this computer',
	slideshow_help_head: 'Slideshow Help',
	slideshow_enlarge_cb_txt: 'Embiggen small images to fill screen',
	slideshow_info_cb_txt: 'Always show title and description',

    uploadr_filesize_bytes: 'bytes',
    uploadr_filesize_kb: 'KB',
    uploadr_filesize_mb: 'MB',
    uploadr_filesize_gb: 'GB',

	uploadr_filetypes_photos: 'Photos',
	uploadr_filetypes_photos_and_videos: 'Photos and Videos',

	findr_load: 'Your selected items are in the Findr below!',

	new_map_matching_here: '%s items matching here',
	new_map_matching_area: '%s items in this area',
	new_map_matching_list: 'Content matching %s',
	new_map_matching_group: 'From the %s group',
	new_map_matching_set: 'In the %s set',
	new_map_matching_user: 'Stuff from %s',
	new_map_matching_this_tag: 'Sorry we couldn\'t find anything tagged %s',

	numap_shuffle: 'SHUFFLE',
	numap_world_view: 'World view',
	numap_search_the_map: 'Search the map',
	numap_a_few_things: 'Here are a few items Flickr members have photographed recently',
	numap_search_for: 'Search for',
	numap_search_for_eg: '(e.g. architecture, urban, forest)',
	numap_taken_in: 'Taken in',
	numap_taken_in_eg: '(e.g. Neighbourhood, City, State, Zip)',
	numap_amazing_photos: 'Amazing bits',
	numap_this_map: 'This map',
	numap_zoom_into: 'Zoom into %s',
	numap_explore: 'Explore %s',

    numap_no_search_results: 'No results found for',
	numap_search_results_tag: '%s result matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_tag_plural: '%s results matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_user_tag: '%s results matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_user_group: '%s results from the <span id="numap_group_span">"%s"</span> group',
	numap_search_results_user: '%s items',
	numap_search_results_tag_group: 'Results from the <span id="numap_group_span">"%s"</span> group matching <span id="numap_tag_span">"%s"</span>',
	numap_search_results_group: 'Flotsam in the <span id="numap_group_link">%s</span> pool',
	numap_search_results_any: '%s result here.',
	numap_search_results_any_plural: '%s results here.',
	numap_search_results_set: '<span id="numap_set_span">%s</span> set (%s item).',
	numap_search_results_set_plural: '<span id="numap_set_span">%s</span> set (%s items).',
	numap_worldwide: '%s <span id="numap_worldwide_span">worldwide</span>',
	numap_by: 'by <span id="numap_worldwide_span">%s</span>',

	numap_search_geotagged_0: '%s geotagged items',
	numap_search_geotagged_1: '%s geotagged item',
	numap_search_geotagged_more: '%s geotagged items',
	numap_search_sort_by: 'Sort by:',
	numap_search_interesting: 'Interesting',
	numap_search_recent: 'Recent',

	numap_return_to_tags: 'Return to World Map View',
	numap_switch_to_zoom_mode: 'Open Zoom Controls',

	numap_refresh_search: 'Show me more photos from here',
	numap_refresh_tags: 'Show me more tags from here',


	numap_search_results_any_4: '%s result here.',
	numap_search_results_any_plural_4: '%s results here.',
	numap_search_results_group_4: 'Flotsam in the <span id="numap_group_link">%s</span> group (%s)',
	numap_search_results_tag_group_4: 'Results from the <span id="numap_group_span">"%s"</span> group matching <span id="numap_tag_span">"%s"</span> (%s)',

	numap_search_results_set_4: '<span id="numap_set_span">%s</span> set (%s).',

	numap_search_results_user_4: '%s items (%s).',
	numap_search_results_user_tag_4: '%s results matching <span id="numap_tag_span">"%s"</span> here (%s).',
	numap_search_results_user_group_4: '%s results from the <span id="numap_group_span">"%s"</span> group (%s).',

	numap_search_results_your_4: 'Your stuff (%s).',
	numap_search_results_your_tag_4: 'Your stuff matching <span id="numap_tag_span">"%s"</span> here (%s).',
	numap_search_results_your_group_4: 'Your stuff in the <span id="numap_group_span">"%s"</span> group (%s).',

	numap_search_results_contacts_4: 'From Your Contacts (%s).',
	numap_search_results_contacts_tag_4: 'Results from Your Contacts matching <span id="numap_tag_span">"%s"</span> here (%s).',

	numap_search_results_ff_4: 'From Your Friends (%s).',
	numap_search_results_ff_tag_4: 'Results from your friends matching <span id="numap_tag_span">"%s"</span> here (%s).',

	numap_search_results_contacts_tag_5_0: '%s results from your contacts matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_contacts_tag_5_1: '%s result from your contacts matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_contacts_tag_5_more: '%s results from your contacts matching <span id="numap_tag_span">"%s"</span> here.',

	numap_search_results_ff_tag_5_0: '%s results from your friends matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_ff_tag_5_1: '%s result from your friends matching <span id="numap_tag_span">"%s"</span> here.',
	numap_search_results_ff_tag_5_more: '%s results from your friends matching <span id="numap_tag_span">"%s"</span> here.',

	numap_search_results_ff_4: 'From Your Friends (%s).',
	numap_search_results_ff_tag_4: 'Results from your friends matching <span id="numap_tag_span">"%s"</span> here (%s).',

	numap_search_look_for_4: 'Search',
	numap_recent_interesting_4: '%s recent interesting items.',

	numap_search_contacts: "From Your Contacts",

	numap_search_everyones: "Everyone\'s Uploads",
	numap_search_contacts: "From Your Contacts",
	numap_search_ff: "From Your Friends",
	numap_search_yours: "Your Photostream",
	numap_search_look_at: 'Look at',
	xxx: '',
	xxx: '',
	xxx: '',

	picnik_mode: 'You\'re in Picnik mode.',
	picnik_cancel_edit: 'OK. We\'ve cancelled that edit. Nothing\'s changed. Carry on.',
	picnik_cancel_auth: 'OK. Looks like you\'d rather not open up Picnik right now. No problemo!',
	picnik_auth_fail: 'For some strange technical reason, your attempt to OK Picnik to load up in Flickr has failed. Can you please <a href="#" onclick="F.picnik.doAuth(); return false;">try again</a>, or <a href="#" onclick="F.picnik.cancelAuth(); return false;">cancel</a>.',
	picnik_offline: 'Gah! Photo editing is offline at the moment. Please <a href="/groups/picnikers">head for the Picnik group for updates</a>.',
	picnik_no_flash: 'To edit your photos on Flickr, you need to install Macromedia Flash, which you can do <a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash">here</a>.',
	picnik_return_to_stream: '<a href="/photos/me">Return to your photostream?</a>',
	picnik_return_to_photo: '<a href="/photos/me/%s">Return to your photo page?</a>',

	invite_friends_to_multiple: 'Multiple recipients',
	invite_invalid_email: 'Error: Make sure you have entered valid email addresses (like example@example.com), and a name for each email address.',
	invite_no_email: 'Error: you have not entered any email addresses!',

	photo_by_someone: '%s by %s',
	photo_by_someone_a: '%s by <a href="http://www.flickr.com/photos/%s" title="%s">%s</a>',
	YOU: 'YOU!',
	
	beehive_invite_limit: 'Bzzt! You can only invite %s people at a time.',
	beehive_invite_unsaved_changes: 'You have made selections below that still need to be saved. Do you want to leave this page anyway?',

	sharing_send_conf: 'OK! Sent.',
	sharing_send_conf_gp: 'OK! Sent. We\'ve included a Guest Pass <span id="GPTT"></span> for recipients to view it. <br><br>The Guest Pass will work until you expire it from <a href="/invite/history/guests/" target="_blank">your Guest Pass history</a>.',
	sharing_send_error: 'Oops! We had trouble sending this. Want to <a href="#" onclick="_ge(\'ShareOptions\').quick_share(); return false;">try again?</a>',
	sharing_email_error: 'Oops! That doesn\'t look like a real email address. Try again?',
	sharing_no_contact: 'Hmm... we couldn\'t find %s in your contacts list. Do you want to try entering their email address instead?\'',

	geotag_from_page_no_alternatives: 'Sorry we couldn\'t find any alternative locations.<br /><br /><a href="#" onclick="_ge(\'a_geotag_toggle\').toggle_geotagging(); return false" class="Plain">Cancel</a>',
	geotag_from_page_no_alternatives_2: 'Sorry we couldn\'t find any alternative locations.<br /><br /><a href="#" onclick="_ge(\'f_div_corrections_right_side\').cancel_alternatives(); return false" class="Plain">Cancel</a>',

	geotag_from_page_who_can_see_5: 'Only you will see this information',
	geotag_from_page_who_can_see_2: 'Only your friends and family will see this information',
	geotag_from_page_who_can_see_4: 'Only your family will see this information',
	geotag_from_page_who_can_see_3: 'Only your friends will see this information',
	geotag_from_page_who_can_see_1: 'Only your contacts will see this information',
	geotag_from_page_who_can_see_0: 'Anyone will be able to see this information',

	geotag_from_page_who_can_see_2_5: 'Only you will see this on the map',
	geotag_from_page_who_can_see_2_2: 'Only your friends and family will see this on the map',
	geotag_from_page_who_can_see_2_4: 'Only your family will see this on the map',
	geotag_from_page_who_can_see_2_3: 'Only your friends will see this on the map',
	geotag_from_page_who_can_see_2_1: 'Only your contacts will see this on the map',
	geotag_from_page_who_can_see_2_0: 'Anyone will be able to see this on the map',

	geotag_from_page_none_of_the_above_pt1: 'None of those seem suitable?',
	geotag_from_page_none_of_the_above_pt2: 'See more names...',
	geotag_from_page_none_of_the_above_none: 'Or <a href="#" onclick="_ge(\'f_div_corrections_right_side\').cancel_alternatives(); return false" class="Plain">cancel</a> and just use the default location name.',
	
	none_of_the_above: 'None of the above',

	group_photopickr_found_single: '(%s item)',
	group_photopickr_found_plural: '(%s items)',
	group_photopickr_add: 'Add items',
	group_photopickr_limit: 'Darn! Flickr is only able to add %s photos at a time to a group. After you add these, why not come back and add some more?',
	group_photopickr_can_add: 'You can add: %s',
	group_photopickr_can_add_at_a_time: 'You can add: %s at a time',
	group_photopickr_could_only_add: 'We could only add %s of the %s items to the group.',
	group_photopickr_could_not_add_single: 'We can\'t add that to the group because it\'s either already in the group, is in too many groups, or doesn\'t follow the rules of this group.',
	group_photopickr_could_not_add_mixed_single: 'We couldn\'t add the other %s because it\'s either already in the group, is in too many groups, or doesn\'t follow the rules of this group.',
	group_photopickr_could_not_add_mixed_plural: 'We couldn\'t add the other %s because they\'re either already in the group, in too many groups, or they don\'t follow the rules of this group.',
	group_photopickr_could_not_add_any: 'None of the items you\'ve selected can be added to the group, because they\'re either already in the group, in too many groups, or they don\'t follow the rules of this group.',
	group_photopickr_taken_out: 'We\'ve taken out the ones you can\'t add.',
	group_photopickr_empty_account: 'Hmm, you haven\'t uploaded anything yet! <a href="/photos/upload/">Upload something now</a>?',
	group_photopickr_adding: 'Adding to pool...',
	group_photopickr_need_selection: 'Oops! You haven\'t selected anything to add to the group.',
	group_photopickr_photostream: 'Your Photostream',
	group_photopickr_search_results: 'Your Search Results',
	group_photopickr_selection_limit: 'Oops! You\'ve reached the limit for this group. You can remove some of your selections if you\'d like to add different ones.',
	group_pool_add_limit: 'Oops! You\'ve reached the limit for this group. Why not head to <a href="%s">the Organizr</a> to clear out some room?',
	
	count_items: '%s item',
	count_items_plural: '%s items',

	use_for_video_too: 'Would you like to use this template for your video blog posts too?',
	use_for_photo_too: 'Would you like to use this template for your photo blog posts too?',

	play_video: 'Play Video',

	corrections_see_more_everyones: 'See <a href="%s?view=everyones" class="Plain">more photos or videos here',
	corrections_add_location: 'Add location',
	corrections_edit: 'edit',
	corrections_map: 'map',
	corrections_other_photo: 'You have %s other photo here, do you wish to also update it\'s location to match this one?',
	corrections_other_photos: 'You have %s other photos here, do you wish to also update their locations to match this one?',
	corrections_some_time: 'It will take a few minutes to update all the photos, but you can carry on as normal as we do the work in the background.',

	corrections_add_location_2: 'Add to your map',
	corrections_found_x_matches_2: 'We found <strong>%s</strong> matches for <strong>%s</strong>.',
	corrections_no_matches_for_2: 'We can\'t find any matches for <strong>%s</strong>.',
	corrections_weve_placed_photo_2: 'We\'ve placed this photo in <strong>%s</strong>',
	corrections_weve_placed_video_2: 'We\'ve placed this video in <strong>%s</strong>',
	corrections_now_were_saying_2: 'Cool! Now we\'re saying taken in <strong>%s</strong>',
	corrections_fuck_it_2: 'Fuck it! Just use <a href="#" onclick="_ge(\'f_div_corrections_right_side\').cancel_alternatives(); return false" class="Plain">%s</a>.',
	corrections_never_mind_2: 'Never mind. Just use <a href="#" onclick="_ge(\'f_div_corrections_right_side\').cancel_alternatives(); return false" class="Plain">%s</a>.',
	corrections_other_photo_2: 'You\'ve just corrected that to %s.',
	corrections_other_photo_pt_plural_2: 'You have %s other items taken here. Shall we change them too?',
	corrections_other_photo_pt_single_2: 'You have something else taken here. Shall we change it too?',
	corrections_other_photos_2: 'You have %s other photos here, do you wish to also update their locations to match this one?',
	corrections_itll_take_a_while: '(Just so you know, it\'ll take a few minutes to make those updates. But you can carry on as normal while we do the work in the background.)',
	
	corrections_drag_around: 'You\'re looking at <strong>%s</strong>. Try dragging the map around or searching.',
	corrections_heres_a_place: 'Here\'s <strong>%s</strong>. Move the map to place your photo.',
	corrections_psst: 'Psst. Does <strong>%s</strong> sound right? <a href="#" onclick="_ge(\'f_div_corrections_right_side\').pre_fetch_alternatives(); return false" class="Plain">See other nearby options</a>.',
	corrections_more: 'More...',
	corrections_no_more: 'No more found.',
	corrections_search_again: 'Search again?',

	a_place_with_no_name: 'a place with no name',

	thinking: 'Thinking..',

	toto_remove_get_started: 'Ready to remove these training wheels?',
	toto_remove_get_started_cancel: 'No, keep this handy list',
	toto_unmute_activity: 'Un-mute activity on this item',
	toto_mute_activity: 'Mute activity on this item',
	toto_unmute_this: 'Un-mute this',
	toto_mute_this: 'Mute this',
	toto_stats_muted: 'You can access Stats in your "You" menu, if you need it after this.',
	toto_no_matching_activity: 'Hmmm... No activity matches your specified criteria.',
	toto_no_matching_activity_v2: 'Hmmm... No activity matches your specified criteria. Try <a href="%s">page 1</a>?',

	cf_loading_photos: 'Loading photos ...',
	cf_loading_portrait_photos: 'Loading portrait photos ...',
	cf_loading_macro_photos: 'Loading macro photos ...',
	cf_loading_night_photos: 'Loading night photos ...',
	cf_loading_landscape_photos: 'Loading landscape photos ...',
	cf_loading_action_photos: 'Loading action photos ...',
	cf_loading_recent_photos: 'Loading recent photos ...',

	tagged_by_you: 'Added by You',
	tagged_by_user: 'Added by %s',
	tagged_by_someone: 'Added by a Flickr Member',
	by_you: ' by <a class="Plain" href="/photos/%s">You</a>',

	xxx: '',
	
	iphone_recent_uploads: 'Recent uploads',
	iphone_contact_list: 'Contact list',
	iphone_your_photostream: 'Your photostream',
	iphone_more: 'More...',
	
	uber_contact_list_view_profile: 'View Profile',
	uber_contact_list_friend_and_family: 'Friend &amp; Family',
	uber_contact_list_friend: 'Friend',
	uber_contact_list_family: 'Family',
	uber_contact_list_contact: 'Contact',
	uber_contact_list_removed: 'Removed',
	uber_contact_list_edit: 'Edit',
	uber_contact_list_default_text: 'screen name, real name, or email',
	uber_contact_list_max_results: 'Showing [results_shown] of [total_results] results. <a href="[url]">See all...</a>',
	uber_contact_list_no_realname: 'No real name given',

	untitled: 'Untitled',
	
	
	rel_link_friend_and_family: '%s is friends & family',
	rel_link_friend: '%s is a friend',
	rel_link_family: '%s is family',
	rel_link_contact: '%s is a contact',
	rel_link_add: 'Add %s as a contact',
	
	tagrs_click_a_tag: 'click a tag:',
	tagrs_no_tags_yet: 'You have no tags yet.',
	
	mail_delete_confirm: 'Are you sure you want to delete the selected messages?',
	mail_delete_all_inbox: 'All %s messages in Your Inbox will be deleted, including messages not shown on this page. Is that what you wanted?',
	mail_delete_all_contact: 'All %s messages in Contact Notifications will be deleted, including messages not shown on this page. Is that what you wanted?',
	mail_delete_all_sent: 'All %s messages in Your Sent Mail will be deleted, including messages not shown on this page. Is that what you wanted?',
	mail_mark_read: 'Click to mark this message as read',
	mail_mark_unread: 'Click to mark this message as unread',
	mail_see_original: 'See your original mail...',
	mail_hide_original: 'Hide your original mail...',

	nearby_show_filters: 'show filters',
	nearby_hide_filters: 'hide filters',

	bo_selecta_no_contacts_found: 'No contacts found.',
	generating_guest_pass_msg: 'Generating Guest Pass...',
	
	gallery_are_you_sure: 'Are you sure you want to remove this from your %s gallery?',

	nearby_looking_at: 'You\'re looking at %s',
	nearby_show_2: 'Show photos and videos <a href="%s" class="Plain" onclick="drag_map.check_nearby(this); return false;">Nearby</a> or <a href="%s" class="Plain">on the Map</a>.',
	nearby_show_3: 'Show photos and videos <a href="%s" class="Plain" onclick="drag_map.check_nearby(this); return false;">Nearby</a> or <a href="%s" class="Plain">on the Map</a>, or go to the <a href="%s" class="Plain">Places Page</a>.',
	nearby_show_zoom: 'You\'ve asked to see nearby photos and videos at quite a high level, but Nearby is far better at street level. Would you like to zoom in a little or carry on anyway?',



	
	remove_from_group_email_status_many: 'Sending FlickrMail to multiple recipients (each recipient will receive a FlickrMail with URLs to the photos of theirs that were removed from the group):',
	remove_from_group_email_subject: 'Item(s) removed from the %s pool',
	remove_from_group_email_body: 'The above item(s) have been removed from the %s group pool.',
	mat_one_are_you_sure_plural: 'Are you sure you want to remove these items from the <b>%s</b> group pool?<br><br>',
	mat_one_able_to_send_notes_many: '(You\'ll be able send a note to the owners of these items on the next screen, if you\'d like.)<br>',
	remove_from_group_email_prompt_many: 'Would you like to <b>send FlickrMail to the owners of those items</b> explaining why you removed something from the pool?',		




    batch_license_getty_plural: '%s photos in this batch are currenty available for license in the Flickr Collection on Getty Images, so their licenses must remain All Rights Reserved for the duration of the agreement.',
    batch_license_getty_single: '1 item in this batch is currently available for license on Getty Images, which means its <a href="/help/gettyimages/#425795">license must remain All Rights Reserved</a>.',
    batch_license_getty_all: 'All photos in this batch are currenty available for license in the Flickr Collection on Getty Images, so their licenses must remain All Rights Reserved for the duration of the agreement.',

    getty_intl_warning: 'Note: You\'re going to a section of gettyimages.com available in English only.',

	not_visible_to_others: 'Not visible to others',


	see_now_i_dont_need_to_worry_about_commas: 1
}
// i still worry about question marks though?

