
    angular
        .module('openeApp.tasks.common')
        .factory('taskService', TaskService);

    function TaskService($http, $translate, sessionService) {
        return {
            getAllTasks: getAllTasks,
            getCaseTasks: getCaseTasks,
            getCurrentUserWorkflowTasks: getCurrentUserWorkflowTasks,
            getCurrentUserGroupTasks: getCurrentUserGroupTasks,
            getCurrentUserSubordinatesTasks: getCurrentUserSubordinatesTasks,
            getTaskDetails: getTaskDetails,
            updateTask: updateTask,
            endTask: endTask,
            getTaskStatuses: getTaskStatuses
        };
        
        function getAllTasks(){
            return $http.get("/api/openesdh/workflow/tasks").then(function (response) {
                return response.data.tasks;
            });
        }
        
        function getCaseTasks(caseId){
            return $http.get("/api/openesdh/case/" + caseId + "/tasks").then(function (response) {
                return response.data;
            });
        }
        
        function getCurrentUserWorkflowTasks() {
            var userInfo = sessionService.getUserInfo();
            var params = {
                    params: {
                        authority: userInfo.user.userName,
                        pooledTasks: false
                    }
            };
            //&state={state?}&priority={priority?}&pooledTasks={pooledTasks?}&dueBefore={dueBefore?}&dueAfter={dueAfter?}&properties={properties?}&maxItems={maxItems?}&skipCount={skipCount?}&exclude={exclude?}
            return $http.get("/api/task-instances", params).then(function (response) {
                return response.data.data;
            });
        }
        
        function getCurrentUserGroupTasks(){
            var userInfo = sessionService.getUserInfo();
            var params = {
                    params: {
                        authority: userInfo.user.userName,
                        pooledTasks: true
                    }
            };
            return $http.get("/api/task-instances", params).then(function (response) {
                return response.data.data;
            });
        }
        
        function getCurrentUserSubordinatesTasks(){
            return $http.get("/api/openesdh/workflow/subordinates/tasks").then(function (response) {
                return response.data;
            });
        }
        
        function getTaskDetails(taskId){
            var url = "/api/openesdh/workflow/task/" + taskId + "/details";
            return $http.get(url).then(function(response){
               return response.data; 
            });
        }
        
        function updateTask(taskId, taskProperties){
            var url = "/api/task-instances/" + taskId;
            return $http.put(url, taskProperties).then(function(response){
                return response.data; 
            });
        }
        
        function endTask(taskId){
            var url = "/api/workflow/task/end/" + taskId;
            return $http.post(url).then(function(response){
                return response.data; 
            });
        }
        
        function getTaskStatuses(){
            return [
                $translate.instant('WORKFLOW.TASK.STATUS.NotYetStarted'),
                $translate.instant('WORKFLOW.TASK.STATUS.InProgres'),
                $translate.instant('WORKFLOW.TASK.STATUS.OnHold'),
                $translate.instant('WORKFLOW.TASK.STATUS.Cancelled'),
                $translate.instant('WORKFLOW.TASK.STATUS.Completed')
            ];
        }

    }