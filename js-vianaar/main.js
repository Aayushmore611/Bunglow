var isMobile = false; //initiate as false
// device detection
if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
    )
)
    isMobile = true;

jQuery(document).ready(function($) {
    // makes the parallax elements
    function parallaxIt() {
        // create variables
        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        var $contents = [];
        var $backgrounds = [];

        // for each of content parallax element
        $('[data-type="content"]').each(function(index, e) {
            var $contentObj = $(this);

            $contentObj.__speed = $contentObj.data("speed") || 1;
            $contentObj.__fgOffset =
                $contentObj.data("offset") || $contentObj.offset().top;
            $contents.push($contentObj);
        });

        // for each of background parallax element
        $('[data-type="background"]').each(function() {
            var $backgroundObj = $(this);

            $backgroundObj.__speed = $backgroundObj.data("speed") || 1;
            $backgroundObj.__fgOffset =
                $backgroundObj.data("offset") || $backgroundObj.offset().top;
            $backgrounds.push($backgroundObj);
        });

        // update positions
        $fwindow.on("scroll resize", function(e) {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            $contents.forEach(function($contentObj) {
                var yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

                $contentObj.css("transform", "translateY(" + -yPos + "px)");
                //console.log("translateY("+ yPos+"px)");
            });

            $backgrounds.forEach(function($backgroundObj) {
                var yPos = -(
                    (scrollTop - $backgroundObj.__fgOffset) /
                    $backgroundObj.__speed
                );

                $backgroundObj.css({
                    backgroundPosition: "50% " + yPos + "px"
                });
            });
        });

        // triggers winodw scroll for refresh
        $fwindow.trigger("scroll");
    }

    parallaxIt();

    // Tabs nav
    $(".tabs-nav").each(function(index, el) {
        var atIndex = $(this).find(".active-tab").index();
        $(this).parents(".tabs-warp").find(".tabs-text:eq(" + atIndex + ")").show();
    });
    $(".tabs-nav ul li a").on("click", function(event) {
        event.preventDefault();
        var $this = $(this);
        if (!$this.parent().hasClass("active-tab")) {
            $this.parent().addClass("active-tab").siblings().removeClass("active-tab");
            var $tabActive = $this.data("tabid");
            $(this).parents(".tabs-warp").find(".tabs-text").hide();
            $(this).parents(".tabs-warp").find($tabActive).fadeIn("slow");
        }
    });

    $(".ptabs-wrap").each(function(index, el) {
        if ($(this).find(".ptabs ul li").length === 1) {
            $(this).find(".ptabs ul").addClass("single-tab");
        }
        var tabTextid = $(this).find(".active-ptabs a").data("tabid");
        $(this).find(tabTextid).show();
    });

    $(".ptabs ul li a").on("click", function(event) {
        event.preventDefault();
        var $this = $(this);
        if (!$this.parent().hasClass("active-ptabs")) {
            $this.parent().addClass("active-ptabs").siblings().removeClass("active-ptabs");

            var $tabActive = $this.data("tabid");
            $(this).parents(".ptabs").parent().find(".tabc").hide();
            $(this).parents(".ptabs").parent().find($tabActive).fadeIn("slow");
            $('[data-ptabid="' + $tabActive + '"]').fadeIn().siblings().hide();
        }
    });

    // Enquire button toggle
    $(".enquire-btn,.enquire-fixed").on("click", function(event) {
        event.preventDefault();
        $(".enquire-form").toggleClass("form-active");
        $("html").addClass("enquire-active");
    });

    $(".close-form").on("click", function(event) {
        event.preventDefault();
        $(".enquire-form").removeClass("form-active");
        $("html").removeClass("enquire-active");
    });






    function fixedHeight() {
        var winH = window.innerHeight;
        $(".enquire-form").height(winH);
    }

    fixedHeight();

    $(window).on("resize", function() {
        fixedHeight();
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    var pinDuration =
        $(".rental-wrap").height() - $(".rf-current .rentals-form").height() - 60;

    var bookNow = new ScrollMagic.Scene({
            triggerHook: 0,
            offset: -60,
            duration: pinDuration + "px",
            triggerElement: ".rental-wrap"
        })
        .setPin(".rf-current .rentals-form", {
            pushFollowers: false
        })
        .addTo(controller);

    controller.updateScene(bookNow, true);

    $(window).on('scroll resize', function(event) {
        pinDuration = $(".rental-wrap").height() - $(".rf-current .rentals-form").height() - 60;

        bookNow.duration(pinDuration);
        controller.updateScene(bookNow, true);
    });

    function sizeAll() {
        var w = window.innerWidth;

        if (w < 992) {
            bookNow.removePin(true);
        } else {
            bookNow.setPin(".rf-current .rentals-form");
        }
    }

    $(window).resize(sizeAll);
    sizeAll();

    $(".header-main").clone(true, true).addClass("header-active").appendTo(".header-sticky");
    $(".headermob").clone(true, true).appendTo(".mob-sticky");
    var lastScrollTop = 0;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();

        var topOffset;

        if ($(".home-intro").length > 0) {
            topOffset = $(".home-intro").height();
        } else if ($(".page-heading").length > 0) {
            topOffset = $(".page-heading").offset().top + $(".page-heading").height();
        }

        // console.log(topOffset);

        if (st > lastScrollTop && $(this).scrollTop() < topOffset) {
            // downscroll code
            $(".header-sticky").removeClass("headroom--pinned");
        } else if (st < lastScrollTop && $(this).scrollTop() > topOffset) {
            // upscroll code
            $(".header-sticky,.mob-sticky").addClass("headroom--pinned");
        } else {
            $(".header-sticky,.mob-sticky").removeClass("headroom--pinned");
        }
        lastScrollTop = st;
    });

    $(".animfadeIn").each(function() {
        var $this = $(this);
        var animdur = $(this).data("animdur") || 1;
        var myScene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })
            .setTween(
                TweenMax.fromTo(
                    this,
                    animdur, {
                        autoAlpha: 0,
                        y: 20
                    }, {
                        autoAlpha: 1,
                        y: 0,
                        onComplete: function() {
                            $this.css("transform", "translate3d(0,0,0)");
                        }
                    }
                )
            )
            .addTo(controller);
    });

    if ($(".slideout-menu").hasClass("slideout-menu")) {
        var slideout = new Slideout({
            panel: document.getElementById("panel"),
            menu: document.getElementById("menumob"),
            padding: 256,
            tolerance: 70
        });

        slideout.disableTouch();
        var fixed = $(".headermob,.mob-sticky,.book-rental-mobile").not(
            ".mob-sticky .headermob"
        );

        slideout.on("translate", function(translated) {
            fixed.css("transform", "translateX(" + translated + "px)");
        });

        slideout.on("beforeopen", function() {
            fixed.css("transition", "transform 300ms ease");
            fixed.css("transform", "translateX(256px)");
            $(".hamburger").addClass("h-active");
        });

        slideout.on("beforeclose", function() {
            fixed.css("transition", "transform 300ms ease");
            fixed.css("transform", "translateX(0px)");
            $(".hamburger").removeClass("h-active");
        });

        slideout.on("open", function() {
            fixed.css("transition", "");
        });

        slideout.on("close", function() {
            fixed.css("transition", "");
            fixed.css("transform", "");
        });
    }

    function winHeight() {
        if (isMobile) {
            $(".hero-row").height($(window).height());
            //console.log('Mobile');
        } else {
            $(".hero-row").height($(window).height());
            //console.log('Desktop');
        }
    }
    winHeight();
    $(window).on("resize", function(event) {
        winHeight();
    });

    // console.log("Height "+ isMobile);

    //cb box hover effect
    TweenMax.set($(".cb-text"), {
        autoAlpha: 0,
        y: 30
    });
    //TweenMax.set($(".cb-layer"), {height:"auto"});
    $(".card-box.has-text").hover(
        function() {
            TweenMax.to($(this).find(".cb-layer"), 0.8, {
                height: "100%"
            });
            TweenMax.to($(this).find(".cb-text"), 0.8, {
                autoAlpha: 1,
                y: 0
            });
        },
        function() {
            TweenMax.to($(this).find(".cb-layer"), 0.8, {
                height: "75px"
            });
            TweenMax.to($(this).find(".cb-text"), 0.8, {
                autoAlpha: 0,
                y: 30
            });
        }
    );

    var cl = $(".header-sticky .main-nav .nav")
        .children()
        .clone(true);

    $("#menumob")
        .prepend(cl)
        .wrapInner("<ul></ul>");

    // mobile menu
    $(".hamburger").click(function(event) {
        $(this).toggleClass("h-active");
        slideout.toggle();
    });

    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 2500) {
                $(".gotop").fadeIn();
            } else {
                $(".gotop").fadeOut();
            }
        });

        // scroll body to 0px on click
        $(".gotop").click(function() {
            $("body,html").animate({
                    scrollTop: 0
                },
                800
            );
            return false;
        });
    });


    $(".faqAccordion").click(function() {
        //Expand or collapse this panel
        $(this).next().slideToggle("fast");
        //Hide the other panels
        $(".faqApanel").not($(this).next()).slideUp("fast");
    });

    $(".accor > h4").on("click", function() {
        $(this).next().slideDown(500).parent().siblings().find(".accor-text").slideUp(500);
    });

    userHasScrolled = false;
    $(window).on("scroll", function() {
        userHasScrolled = true;
        // console.log("Scrolling");
        $(".pattern-bg").css("backfaceVisibility", "hidden");
    });

    setInterval(function() {
        if (userHasScrolled) {
            userHasScrolled = false;
            // console.log("Not Scrolling");
            $(".pattern-bg").css("backfaceVisibility", "");
        }
    }, 5000);





});