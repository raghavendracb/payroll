var app = angular.module('app',[]);

app.controller('EmployeeCRUDCtrl', ['$scope','EmployeeCRUDService', function ($scope,EmployeeCRUDService) {
    $scope.updateEmployee = function () {
        EmployeeCRUDService.updateEmployee($scope.employee.id,$scope.employee.name,$scope.employee.role)
          .then(function success(response){
              $scope.message = 'Employee data updated!';
              $scope.errorMessage = '';
              $scope.getAllEmployees(true);
          },
          function error(response){
              $scope.errorMessage = 'Error updating Employee!';
              $scope.message = '';
          });
    }
    
    $scope.getEmployee = function () {
        EmployeeCRUDService.getEmployee($scope.employee.id)
          .then(function success(response){
              $scope.employee = response.data;
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message = '';
              if (response.status === 404){
                  $scope.errorMessage = 'Employee not found!';
              }
              else {
                  $scope.errorMessage = "Error getting Employee!";
              }
          });
    }
    
    $scope.setEmployee = function (id) {
    	$scope.employee = $scope.employees[id];
    	$scope.message = '';
        $scope.errorMessage = ''; 
    }
     
    $scope.addEmployee = function () {
        if ($scope.employee != null && $scope.employee.name) {
            EmployeeCRUDService.addEmployee($scope.employee.name, $scope.employee.role)
              .then (function success(response){
                  $scope.message = 'Employee added!';
                  $scope.errorMessage = '';
                  $scope.getAllEmployees(true);
              },
              function error(response){
                  $scope.errorMessage = 'Error adding Employee!';
                  $scope.message = '';
            });
        }
        else {
            $scope.errorMessage = 'Please enter a name!';
            $scope.message = '';
        }
    }
    
    $scope.deleteEmployee = function () {
        EmployeeCRUDService.deleteEmployee($scope.employee.id)
          .then (function success(response){
              $scope.message = 'Employee deleted!';
              $scope.employee = null;
              $scope.errorMessage='';
              $scope.getAllEmployees(true);
          },
          function error(response){
              $scope.errorMessage = 'Error deleting Employee!';
              $scope.message='';
          })
    }
    
    $scope.getAllEmployees = function (flag) {
    	console.log("Inside getAllEmployees...");
        EmployeeCRUDService.getAllEmployees()
          .then(function success(response){
              $scope.employees = response.data;
              if(flag == undefined || flag == false){
	              $scope.message='';
	              $scope.errorMessage = '';
              }
          },
          function error (response ){
              $scope.message='';
              $scope.errorMessage = 'Error getting Employees!';
          });
    }

}]);

app.service('EmployeeCRUDService',['$http', function ($http) {
	
    this.getEmployee = function getEmployee(id){
        return $http({
          method: 'GET',
          url: 'employees/'+id
        });
	}
	
    this.addEmployee = function addEmployee(name, role){
        return $http({
          method: 'POST',
          url: 'employees',
          data: {name:name, role:role}
        });
    }
	
    this.deleteEmployee = function deleteEmployee(id){
        return $http({
          method: 'DELETE',
          url: 'employees/'+id
        })
    }
	
    this.updateEmployee = function updateEmployee(id,name,role){
        return $http({
          method: 'PUT',
          url: 'employees/'+id,
          data: {name:name, role:role}
        })
    }
	
    this.getAllEmployees = function getAllEmployees(){
        return $http({
          method: 'GET',
          url: 'employees'
        });
    }

}]);
