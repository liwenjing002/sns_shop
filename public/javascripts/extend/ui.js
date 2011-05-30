function selectShare(share) {
    $('.share-type').hide();
    $('#'+share).show();
//    $('#'+share+' :input[type!="hidden"]')[0].focus();
    $('.share-selector a').removeClass('active');
    $('#'+share+'-icon').addClass('active');
}
function showShare() {
    $('.share-details').show();
    $('#share-starter').hide();
    var first = $('.share .share-type:first').attr('id');
    selectShare(first);
}
function hideShare() {
    $('.share-type, .share-details').hide();
    $('#share-starter').show();
}
$('#share-starter').live('focus', showShare);