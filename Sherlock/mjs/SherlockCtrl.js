angular
    .module('SherlockApp', ['ngResource', 'ngMaterial', 'ngMessages', 'LocalStorageModule', 'ui.router','ngSanitize', 'ngCsv'])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageCookie(1, '/');
    })
    .config(function ($mdThemingProvider) {
        //$mdThemingProvider.theme('default')
        //    .primaryPalette('green');
    })
    .config(function ($mdIconProvider) {
        $mdIconProvider
        .icon('kelock', './mimg/ke_lock.svg', 32)
        .icon('loguser', './mimg/user.svg', 32)
        .icon('passkey', './mimg/pas_key4.svg', 32)
        .icon('unlock', './mimg/unlock2.svg', 32)
        .icon('smartphone', './mimg/smart-phone.svg', 32)
        .icon('emailmsg', './mimg/email_msg.svg', 32)
        .icon('zipcode', './mimg/place.svg', 32)
        .icon('moreshow', './mimg/more2.svg', 32)
        .icon('useradd', './mimg/user-add.svg', 32)
        .icon('plussign', './mimg/plus_sign.svg', 32)
        .icon('refresh', './mimg/refresh1.svg', 32)
        .icon('cancelbtn', './mimg/cancel_btn.svg', 32)
        .icon('refresh', './mimg/refresh1.svg', 32)
        .icon('menuitem', './mimg/th-menu.svg', 32)
        .icon('logout', './mimg/power_btn2.svg', 32)
        .icon('login', './mimg/login2.svg', 32)
        .icon('networkip', './mimg/network_server.svg', 32)
        .icon('blocklist', './mimg/block.svg', 32);
    })
    .run(function ($http, $templateCache) {
        var urls = [
            './mimg/ke_lock.svg',
            './mimg/user.svg',
            './mimg/pas_key4.svg',
            './mimg/unlock2.svg',
            './mimg/email_msg.svg',
            './mimg/place.svg',
            './mimg/more2.svg',
            './mimg/user-add.svg',
            './mimg/plus_sign.svg',
            './mimg/cancel_btn.svg',
            './mimg/refresh1.svg',
            './mimg/th-menu.svg',
            './mimg/power_btn2.svg',
            './mimg/login2.svg',
            './mimg/network_server.svg',
            './mimg/block.svg'
        ];
        angular.forEach(urls, function (url) {
            $http.get(url, { cache: $templateCache });
        });
    })
    //.run(['$rootScope', '$state', 'userService', function ($rootScope, $state, userService) {
    //    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    //        })
    //}
    .factory('SherlockDataService', ['$resource', function ($resource) {
        return {
            SuppressionListData: $resource('/sherlockservice/api/sherlock/SuppressionListData', { pkey: '@pkey' }, {
                query: { method: 'GET', params: {} }
            }),
            AddSuppression: $resource('/sherlockservice/api/sherlock/SuppressionAddData', { data: '@data' }, {
                query: { method: 'GET', params: {} }
            }),
            loginCheck: $resource('/sherlockservice/api/sherlock/authenticateuser', { uname: '@uname', pwd: '@pwd' }, {
                query: { method: 'GET', params: {} }
            }),
            logoutSherlock: $resource('/sherlockservice/api/sherlock/logoutsherlock', { pkey: '@pkey' }, {
                query: { method: 'GET', params: {} }
            })
        };
    }])
    .service('SuppressionListService', function (SherlockDataService) {
         this.suppressions = [];
         this.loadSuppressions = function () {
             var that = this;

             SherlockDataService.SuppressionListData.query({ pkey: 'a' }).$promise.then(function (data) {
                 // var data = angular.toJson(data.allSuppression);
                 console.log(data.allSuppression);
                 angular.copy(data.allSuppression, that.suppressions);
                 that.errorCondition = false;
             },
                 function (error) {
                     //$log.error('fetch failed!');
                     // wipe galleries without removing reference
                     that.suppressions.length = 0;
                     that.errorCondition = true;
                 })
         };
    })
    .factory('SuppressionListBroadcast', function ($rootScope, SuppressionListService) {
        var broadcastSuppression = {};
        broadcastSuppression.suppressions = [];
        broadcastSuppression.refreshSuppressionList = function () {
            broadcastSuppression.suppressions = SuppressionListService.loadSuppressions();
            broadcastSuppression.broadcastItem();
        }

        broadcastSuppression.broadcastItem = function () {
            $rootScope.$broadcast('handleSuppressionBroadcast');
        };

        return broadcastSuppression;
    })
    .config(["$locationProvider", function ($locationProvider) {
        //$locationProvider.html5Mode(true);
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                controller:'HomeController as homeCtrl',
                templateUrl: './partials/_Home.html'
            })
            .state('suppressions', {
                url: "/suppressions",
                controller:'SuppressionController as supCtrl',
                templateUrl: './partials/_Suppression.html'
            })
            .state('addsuppressions', {
                url: "/addsuppressions",
                controller: 'SuppressionController as supCtrl',
                templateUrl: './partials/_AddSuppression.html'
            })
    })
    .controller('SherlockCtrl', function ($rootScope, $state, $interval, $mdSidenav, $mdDialog, $mdBottomSheet, SherlockDataService, SuppressionListBroadcast, localStorageService) {

        var self = this;
        self.insuppression = false;

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log(toState);
            if (toState.name == 'suppressions') {
                self.insuppression = true;
            }
            else {
                self.insuppression = false;
            }
        })

        self.refreshSuppression = function () {
            SuppressionListBroadcast.refreshSuppressionList();
        }

        self.templateUrlToolbar = 'partials/_ToolbarButton.html';

        self.startInitialFns = function () {
            self.showLogin();
        };
        //$locationProvider.html5Mode(true);
        //var url = $location.url();

        var showError = function (error) {

            self.ifError = true;
            if (error.status == 403) {
                console.log(error);
                self.errorMessage = error.data;
                localStorageService.remove('loginscs');
                //self.logText = "Log In";

                self.showLogin();
            }
            else if (error.status >= 400 && error.status < 500)
                self.errorMessage = error.statusText + '. Try reloading the page. Error code = Http : ' + error.status;
            else if (error.status >= 500 && error.status < 600)
                self.errorMessage = error.statusText + '. Server Error = Http : ' + error.status;
            else if (error.status == 0)
                self.errorMessage = 'The server is down or we lost internet. Trying to re-connect...' + '\r\n If it persists beyond your patience, contact Administrator';
        };

        var getPubKey = function () {
            return localStorageService.get('loginscs');
        };
        var removePubKey = function () {
            return localStorageService.remove('loginscs');
        };

        self.loginSuccess = true;
        var authenticated = function () {
            var scs = getPubKey();
            if (scs == undefined || scs == '') {
                console.log('f');
                self.loginSuccess = false;
                return false;
            }
            else {
                console.log('s');
                self.loginSuccess = true;
                return true;
            }
        };

        self.logOut = function () {

            SherlockDataService.logoutSherlock.query({ pkey: getPubKey() }).$promise.then(function (data) {
                console.log(data);
            });

            removePubKey();
            self.loginSuccess = false;
            self.showLogin();

        };

        self.showLogin = function () {

            if (!authenticated()) {
                $mdDialog.show({
                    parent: angular.element(document.body),
                    controller: 'DialogController as dlgctrl',
                    templateUrl: 'partials/_Login.html'//,
                    //targetEvent: ev,
                })
                    .then(function (answer) {
                        //localStorageService.set('loginscs', 'y');
                        self.loginSuccess = answer;
                        //refreshData();
                        //startPromise();
                    }, function () {
                        self.loginSuccess = true;
                        // self.alert = 'You cancelled the dialog.';
                    });
            }
            else {
                self.loginSuccess = true;
                //startPromise();
            }
        };

        self.toggleLeft = buildToggler('left');
        function buildToggler(navID) {
            return function () {
                return $mdSidenav(navID).toggle();
            }
        };

        self.close = function () {
            $mdSidenav('left').close();
        };

        self.addNewSuppression = function () {
            $state.go('addsuppressions');
        }

    })
    .controller("HomeController", function () {
    })
    .directive('sherlockDrill', function () {
        return {
            template: '<svg></svg>',
            restrict: 'E',
            link: function (scope, elem, attr) {
                // Globals
                var width = 500,
                    height = 400,
                    margin = 50,
                    radius = Math.min(width - margin, height - margin) / 2,
                    // Pie layout will use the "val" property of each data object entry
                    pieChart = d3.layout.pie().sort(null).value(function (d) { return d.val; }),
                    arc = d3.svg.arc().outerRadius(radius),
                    MAX_SECTORS = 15, // Less than 20 please
                    colors = d3.scale.category20();

                // Synthetic data generation ------------------------------------------------
                var data = [];
                var numSectors = Math.ceil(Math.random() * MAX_SECTORS);
                for (i = -1; i++ < numSectors;) {
                    var children = [];
                    var numChildSectors = Math.ceil(Math.random() * MAX_SECTORS);
                    var color = colors(i);
                    for (j = -1; j++ < numChildSectors;) {
                        // Add children categories with shades of the parent color
                        children.push(
                          {
                              cat: "loan" + ((i + 1) * 100 + j),
                              val: Math.random(),
                              color: d3.rgb(color).darker(1 / (j + 1))
                          });
                    }
                    data.push({
                        cat: "loan" + i,
                        val: Math.random(),
                        color: color,
                        children: children
                    });
                }
                // --------------------------------------------------------------------------


                // SVG elements init
                var svg = d3.select(elem.find('svg')[0]).attr("width", width).attr("height", height),
                    defs = svg.append("svg:defs"),
                    // Declare a main gradient with the dimensions for all gradient entries to refer
                    mainGrad = defs.append("svg:radialGradient")
                      .attr("gradientUnits", "userSpaceOnUse")
                      .attr("cx", 0).attr("cy", 0).attr("r", radius).attr("fx", 0).attr("fy", 0)
                      .attr("id", "master"),
                    // The pie sectors container
                    arcGroup = svg.append("svg:g")
                      .attr("class", "arcGroup")
                      .attr("filter", "url(#shadow)")
                      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")"),
                    // Header text
                    header = svg.append("text").text("Mortgage")
                              .attr("transform", "translate(10, 20)").attr("class", "header");

                // Declare shadow filter
                var shadow = defs.append("filter").attr("id", "shadow")
                              .attr("filterUnits", "userSpaceOnUse")
                              .attr("x", -1 * (width / 2)).attr("y", -1 * (height / 2))
                              .attr("width", width).attr("height", height);
                shadow.append("feGaussianBlur")
                  .attr("in", "SourceAlpha")
                  .attr("stdDeviation", "4")
                  .attr("result", "blur");
                shadow.append("feOffset")
                  .attr("in", "blur")
                  .attr("dx", "4").attr("dy", "4")
                  .attr("result", "offsetBlur");
                shadow.append("feBlend")
                  .attr("in", "SourceGraphic")
                  .attr("in2", "offsetBlur")
                  .attr("mode", "normal");



                // Redraw the graph given a certain level of data
                function updateGraph(cat) {
                    var currData = data;

                    // Simple header text
                    if (cat != undefined) {
                        currData = findChildenByCat(cat);
                        d3.select(".header").text("Mortgage → " + cat);
                    } else {
                        d3.select(".header").text("Mortgage");
                    }

                    // Create a gradient for each entry (each entry identified by its unique category)
                    var gradients = defs.selectAll(".gradient").data(currData, function (d) { return d.cat; });
                    gradients.enter().append("svg:radialGradient")
                      .attr("id", function (d, i) { return "gradient" + d.cat; })
                      .attr("class", "gradient")
                      .attr("xlink:href", "#master");

                    gradients.append("svg:stop").attr("offset", "0%").attr("stop-color", getColor);
                    gradients.append("svg:stop").attr("offset", "90%").attr("stop-color", getColor);
                    gradients.append("svg:stop").attr("offset", "100%").attr("stop-color", getDarkerColor);


                    // Create a sector for each entry in the enter selection
                    var paths = arcGroup.selectAll("path")
                                  .data(pieChart(currData), function (d) { return d.data.cat; });
                    paths.enter().append("svg:path").attr("class", "sector");

                    // Each sector will refer to its gradient fill
                    paths.attr("fill", function (d, i) { return "url(#gradient" + d.data.cat + ")"; })
                      .transition().duration(1000).attrTween("d", tweenIn).each("end", function () {
                          this._listenToEvents = true;
                      });

                    // Mouse interaction handling
                    paths.on("click", function (d) {
                        if (this._listenToEvents) {
                            // Reset inmediatelly
                            d3.select(this).attr("transform", "translate(0,0)")
                            // Change level on click if no transition has started                
                            paths.each(function () {
                                this._listenToEvents = false;
                            });
                            updateGraph(d.data.children ? d.data.cat : undefined);
                        }
                    })
                          .on("mouseover", function (d) {
                              // Mouseover effect if no transition has started                
                              if (this._listenToEvents) {
                                  // Calculate angle bisector
                                  var ang = d.startAngle + (d.endAngle - d.startAngle) / 2;
                                  // Transformate to SVG space
                                  ang = (ang - (Math.PI / 2)) * -1;

                                  // Calculate a 10% radius displacement
                                  var x = Math.cos(ang) * radius * 0.1;
                                  var y = Math.sin(ang) * radius * -0.1;

                                  d3.select(this).transition()
                                    .duration(250).attr("transform", "translate(" + x + "," + y + ")");
                              }
                          })
                          .on("mouseout", function (d) {
                              // Mouseout effect if no transition has started                
                              if (this._listenToEvents) {
                                  d3.select(this).transition()
                                    .duration(150).attr("transform", "translate(0,0)");
                              }
                          });

                    // Collapse sectors for the exit selection
                    paths.exit().transition()
                      .duration(1000)
                      .attrTween("d", tweenOut).remove();
                }


                // "Fold" pie sectors by tweening its current start/end angles
                // into 2*PI
                function tweenOut(data) {
                    data.startAngle = data.endAngle = (2 * Math.PI);
                    var interpolation = d3.interpolate(this._current, data);
                    this._current = interpolation(0);
                    return function (t) {
                        return arc(interpolation(t));
                    };
                }


                // "Unfold" pie sectors by tweening its start/end angles
                // from 0 into their final calculated values
                function tweenIn(data) {
                    var interpolation = d3.interpolate({ startAngle: 0, endAngle: 0 }, data);
                    this._current = interpolation(0);
                    return function (t) {
                        return arc(interpolation(t));
                    };
                }


                // Helper function to extract color from data object
                function getColor(data, index) {
                    return data.color;
                }


                // Helper function to extract a darker version of the color
                function getDarkerColor(data, index) {
                    return d3.rgb(getColor(data, index)).darker();
                }


                function findChildenByCat(cat) {
                    for (i = -1; i++ < data.length - 1;) {
                        if (data[i].cat == cat) {
                            return data[i].children;
                        }
                    }
                    return data;
                }

                // Start by updating graph at root level
                updateGraph();
            }
        };
    })
    .directive('sherlockProduct', function () {
        return {
            template: '<svg></svg>',
            restrict: 'E',
            link: function (scope, elem, attr) {

                var treeData = [
                    {
                        "name": "Products",
                        "parent": "null",
                        "_children": [
                            {
                                "name": "Insurance",
                                "parent": "Products",
                                "_children": [
                                    {
                                        "name": "Heath",
                                        "parent": "Insurance"
                                    },
                                    {
                                        "name": "Life",
                                        "parent": "Insurance"
                                    },
                                    {
                                        "name": "Travel",
                                        "parent": "Insurance"
                                    }
                                ]
                            },
                            {
                                "name": "Mortgage",
                                "parent": "Products",
                                "_children": [
                                    {
                                        "name": "Mortgage1",
                                        "parent": "Mortgage"
                                    },
                                    {
                                        "name": "Mortgage2",
                                        "parent": "Mortgage",
                                        "_children": [
                                            {
                                                "name": "Mortgage2-1",
                                                "parent": "Mortgage2"
                                            },
                                            {
                                                "name": "Mortgage2-2",
                                                "parent": "Mortgage2"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Loan",
                                "parent": "Products",
                                "_children": [
                                    {
                                        "name": "Loan1",
                                        "parent": "Loan"
                                    },
                                    {
                                        "name": "Loan2",
                                        "parent": "Loan"
                                    }
                                ]
                            }
                        ]
                    }
                ];

                var margin = { top: 5, right: 5, bottom: 5, left: 100 },
                    width = 500 - margin.right - margin.left,
                    height = 350 - margin.top - margin.bottom;

                var i = 0,
                    duration = 750,
                    root;

                var tree = d3.layout.tree()
                    .size([height, width * 1.4]);

                var diagonal = d3.svg.diagonal()
                    .projection(function (d) { return [d.y, d.x]; });



                var svg = d3.select(elem.find('svg')[0])
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("viewBox", "0 0 800 800")
                    .attr("preserveAspectRatio", "xMinYMin")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                root = treeData[0];
                root.x0 = height / 2;
                root.y0 = 0;

                update(root);

                d3.select(self.frameElement).style("height", "500px");

                function update(source) {

                    // Compute the new tree layout.
                    var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);

                    // Normalize for fixed-depth.
                    nodes.forEach(function (d) { d.y = d.depth * 180; });

                    // Update the nodes…
                    var node = svg.selectAll("g.node")
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });

                    // Enter any new nodes at the parent's previous position.
                    var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                        .on("click", click);

                    nodeEnter.append("circle")
                        .attr("r", 1e-6)
                        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; })
                        .append("svg:title")
                        .text(function (d) { return d.Role; });

                    nodeEnter.append("text")
                        .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
                        .attr("dy", ".35em")
                        .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                        .text(function (d) { return d.name; })
                        .style("fill-opacity", 1e-6);

                    // Transition nodes to their new position.
                    var nodeUpdate = node.transition()
                        .duration(duration)
                        .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                    nodeUpdate.select("circle")
                        .attr("r", 10)
                        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

                    nodeUpdate.select("text")
                        .style("fill-opacity", 1);

                    // Transition exiting nodes to the parent's new position.
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
                        .remove();

                    nodeExit.select("circle")
                        .attr("r", 1e-6);

                    nodeExit.select("text")
                        .style("fill-opacity", 1e-6);

                    // Update the links…
                    var link = svg.selectAll("path.link")
                        .data(links, function (d) { return d.target.id; });

                    // Enter any new links at the parent's previous position.
                    link.enter().insert("path", "g")
                        .attr("class", "link")
                        .attr("d", function (d) {
                            var o = { x: source.x0, y: source.y0 };
                            return diagonal({ source: o, target: o });
                        });

                    // Transition links to their new position.
                    link.transition()
                        .duration(duration)
                        .attr("d", diagonal);

                    // Transition exiting nodes to the parent's new position.
                    link.exit().transition()
                        .duration(duration)
                        .attr("d", function (d) {
                            var o = { x: source.x, y: source.y };
                            return diagonal({ source: o, target: o });
                        })
                        .remove();

                    // Stash the old positions for transition.
                    nodes.forEach(function (d) {
                        d.x0 = d.x;
                        d.y0 = d.y;
                    });
                }

                // Toggle children on click.
                function click(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update(d);
                }
            }
        };
    })
    .controller("SuppressionController", function SuppressionController($scope, SuppressionListService, SherlockDataService, SuppressionListBroadcast, $mdToast, $animate, $state) {
      
        this.supList = {};

        this.initialFns = function () {
            SuppressionListService.loadSuppressions();
            this.allrecords = SuppressionListService.suppressions;
        };

        this.getHeader = function () {return ["A", "B"]};

        this.addNew = function () {
            $state.go('addsuppressions');
        }

        this.cancelSuppression = function () {
            $state.go('suppressions');
        }

        var toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: true
        };
        var getToastPosition = function () {
            return Object.keys(toastPosition)
              .filter(function (pos) { return toastPosition[pos]; })
              .join(' ');
        };

        var showAddToast = function () {
            $mdToast.show(
              $mdToast.simple()
                .content('One user added!')
                .position(getToastPosition())
                .hideDelay(5000)
            );
            console.log('s');
        };

        this.addSuppression = function (slist) {
            this.supList = angular.copy(slist);
            console.log(this.supList);
            SherlockDataService.AddSuppression.query({ data: this.supList }).$promise.then(function (data) {
                $state.go('suppressions');
                SuppressionListService.loadSuppressions();
                showAddToast();
                this.allrecords = SuppressionListService.suppressions;
            });
            this.clickedAddNew = false;
        }

        this.clearSuppression = function (list) {
          
        }

        $scope.$on('handleSuppressionBroadcast', function () {
            this.allrecords = SuppressionListBroadcast.suppressions;
        });

        //console.log(this.allrecords);

        //var populateData = function () {
        //    SherlockDataService.SuppressionListData.query({ pkey: 'a' }).$promise.then(function (data) {
        //        data = angular.toJson(data.allSuppression);
        //        this.allrecords = data;
        //        console.log(this.allrecords);
        //    })

        //}
        //populateData();
    })
    .run(function (SuppressionListService) {
        // initialize data store
        //SuppressionListService.loadSuppressions();
    })
    .controller('DialogController', function ($mdDialog, SherlockDataService, localStorageService) {

        var self = this;
        self.hide = function () {
            $mdDialog.hide();
        };
        self.cancel = function () {
            $mdDialog.cancel();
        };

        self.loginFailureMsg = false;
        self.nouid = false;
        self.nopwd = false;


        self.checkLogin = function () {
            var credin = true;
            //console.log(self.user.upwd);
            if (self.user != undefined) {
                if (self.user.uid == undefined || self.user.uid == '') {
                    self.nouid = true;
                    credin = false;
                }
                if (self.user.upwd == undefined || self.user.upwd == '') {
                    self.nopwd = true;
                    credin = false;
                }
                if (credin) {
                    $mdDialog.hide(true);
                    //SherlockDataService.loginCheck.query({ uname: self.user.uid, pwd: self.user.upwd }).$promise.then(function (data) {
                    //    var publicKey = [];
                    //    console.log(data);
                    //    publicKey = data;
                    //    if (publicKey.publicKey != 'notauthenticated') {
                    //        localStorageService.set('loginscs', publicKey.publicKey);
                    //        $mdDialog.hide(true);
                    //    } else
                    //        self.loginFailureMsg = true;
                    //});

                }
            }
            else {
                self.nouid = true;
                self.nopwd = true;
            }
        };
    })
;

