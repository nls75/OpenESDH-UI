
angular
        .module('openeApp.files')
        .controller('AssignFileDialogController', AssignFileDialogController);

function AssignFileDialogController($mdDialog, $translate, filesService, notificationUtilsService, sessionService, file) {
    var assignFileVm = this;
    assignFileVm.owner = null;
    assignFileVm.comment = null;
    assignFileVm.currentUser = sessionService.getUserInfo().user.userName;

    assignFileVm.assignFile = assignFile;
    assignFileVm.cancel = cancel;

    function assignFile() {
        filesService.moveFile(file.nodeRef, assignFileVm.owner, assignFileVm.comment)
                .then(function() {
                    notificationUtilsService.notify($translate.instant("FILE.FILE_ASSIGNED_SUCCESSFULLY",
                            {title: file.cm.title, authorityName: assignFileVm.owner.name}));
                    $mdDialog.hide();
                });
    }

    function cancel() {
        $mdDialog.cancel();
    }
}