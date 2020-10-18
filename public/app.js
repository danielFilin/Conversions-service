var app = angular.module('app', []);

app.controller('conversionsCtrl', ['$scope', '$http', function($scope, $http){
  $scope.message;
  $scope.messageColor;
  $scope.addConversion = function() {
    const newConversion = {
      name: this.name,
    }
    performConversion(newConversion);
    this.name = "";
  }
  function performConversion(newConversion){
    $http.post("http://localhost:3000/conversions/addOne", newConversion)
    .then(function(response) {
      console.log(response)
      if (response.status !== 200) {
        $scope.messageColor = "danger";
      } else {
        $scope.messageColor = "success";
      }
      $scope.message = response.data.message;
    }
    ).catch(function(error) {
      console.log(error);
    });
  }
  
}])

app.controller("conversionDataCtrl", ["$scope", "$http", function($scope, $http){
  $scope.items;
  $scope.callTime = [];
  $scope.infoMessage;
  $scope.messageColor;
  $scope.getConversionData = function(event) {
    $scope.items = [];
    $scope.callTime = [];
    if (event.submitter.innerHTML === "Get All Data") {
      return getAllData();
    }

    if (this.from === null || this.to === null || this.conversionName === undefined) {
      $scope.messageColor = "danger";
      $scope.infoMessage = "Please enter date and conversion name!"
    } 
    const conversionsData = {
      from: this.from,
      to: this.to,
      conversionName: this.conversionName
    }
    getDataInRange(conversionsData);
    this.from = "";
    this.to = "";
    this.conversionName = "";
  }
  const getAllData = () => {
    $http.get("http://localhost:3000/conversions/getAllData")
    .then(function(response) {
      console.log(response);
      if (response.data.data === "No items to show!") {
        $scope.messageColor = "danger";
        $scope.infoMessage = "No data to show for the given range!"
        return;
      }
      $scope.infoMessage = "Please see the list with the availiable data:"
      $scope.messageColor = "success";

      $scope.items = response.data.data;
      for (let item of $scope.items){
        const time = [];
        for (let call of item.calls) {
          time.push(call);
        }
        $scope.callTime.push(time);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  const getDataInRange = (conversionsData) => {
    $http.get(`http://localhost:3000/conversions/inrange/${conversionsData.from}/${conversionsData.to}/${conversionsData.conversionName}`)
    .then(function(response) {
      if(response.status !== 200) {
        $scope.messageColor = "danger";
        $scope.infoMessage = "No data to show for the given range!"
      }
      $scope.items = response.data.data;
    })
    .catch(function(error) {
      $scope.messageColor = "danger";
      $scope.infoMessage = "Did you forget to insert query data???"
      console.log(error);
    });;
  }
}])