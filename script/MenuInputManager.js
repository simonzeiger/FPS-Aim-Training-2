MenuInputManager = function (game) {

    var _this = this;

    function getValsFromCookie(cookie) {

        if (cookie != null && cookie != "" && cookie != undefined && cookie != "undefined") {
            console.log("Yee");
            var obj = JSON.parse(cookie);
            this.sens = obj.sens;
            this.targetSize = obj.targetSize;
            this.yaw = obj.yaw;
            this.amount = obj.amount;
            this.delay = obj.delay;
            this.duration = obj.duration;
            this.invertPitch = obj.invertPitch;
            this.invertYaw = obj.invertYaw;
            this.resChange = obj.resChange;
            this.soundEnabled = obj.soundEnabled;
            this.targetColor = obj.targetColor;
            this.crosshairColor = obj.crosshairColor;
        } else {
            this.sens = DEF_SENS;
            this.targetSize = 1;
            this.yaw = 0.022;
            this.amount = 25;
            this.delay = .5;
            this.duration = .75;
            this.invertPitch = false;
            this.invertYaw = false;
            this.resChange = false;
            this.soundEnabled = true;
            this.targetColor = "#00ff00";
            this.crosshairColor = "#000000";
        }
        return this;
    }

    console.log(document.cookie);

    var vals = new getValsFromCookie(document.cookie);
    save(vals != null && vals != undefined);
    apply();


    function save(isFromCookie) {
        if ($("#sens").val() > 0 && !isNaN($("#sens").val()) && !isFromCookie) {
            vals.sens = $("#sens").val();
        } else {
            console.log(vals.sens);
            $("#sens").val(vals.sens);
        }

        if ($("#yaw").val() > 0 && !isNaN($("#yaw").val()) && !isFromCookie) {
            vals.yaw = $("#yaw").val();
        } else {
            $("#yaw").val(vals.yaw);
        }

        if (!isNaN($("#amount").val()) && $("#amount").val() > 0 && ($("#amount").val() % 1 === 0) && !isFromCookie) {
            vals.amount = $("#amount").val();
        } else {
            $("#amount").val(vals.amount);
        }

        if (!isNaN($("#delay").val()) && $("#delay").val() > 0 && !isFromCookie) {
            vals.delay = $("#delay").val();
        } else {
            $("#delay").val(vals.delay);
        }

        if (!isNaN($("#duration").val()) && $("#duration").val() > 0 && !isFromCookie) {
            vals.duration = $("#duration").val();
        } else {
            $("#duration").val(vals.duration);
        }

        if (!isFromCookie) {
            vals.targetSize = parseFloat($("#myRange").val()) + 0.2;
        } else {
            $("#myRange").defaultValue = vals.targetSize - 0.2;
            $("#myRange").val(vals.targetSize - 0.2);
        }

        if (!isFromCookie) {
            vals.invertPitch = $("#invertx").is(':checked');
        } else {
            $("#invertx").prop("checked", vals.invertPitch);
        }

        if (!isFromCookie) {
            invertYaw = $("#inverty").is(':checked');
        } else {
            $("#invertx").prop("checked", vals.invertYaw);
        }

        if (!isFromCookie) {
            vals.soundEnabled = $("#sound").is(':checked');
        } else {
            $("#sound").prop("checked", vals.soundEnabled);
        }

        if (!isFromCookie) {
            vals.targetColor = $("#targetcolor").val();
        } else {
            $("#targetcolor").val(vals.targetColor);
        }

        if (!isFromCookie) {
            vals.crosshairColor = $("#crosshaircolor").val();
        } else {
            $("#crosshair").val(vals.crosshairColor);
        }

        if(isFromCookie){
            $("#targetsize").text(Math.round(vals.targetSize * 10));            
        }

    }

    this.reset = function () {
        $("#sens").val(vals.sens);
        $("#amount").val(vals.amount);
        $("#delay").val(vals.delay);
        $("#duration").val(vals.duration);
        $("#yaw").val(vals.yaw);
        $("#invertx").prop("checked", vals.invertPitch);
        $("#inverty").prop("checked", vals.invertYaw);
        $("#sound").prop("checked", vals.soundEnabled);
        $("#myRange").val(vals.targetSize - .2);
        $("#targetsize").text(Math.round(vals.targetSize * 10));
        $("#targetcolor").val(vals.targetColor);
        $("#crosshair").val(vals.crosshairColor);

    }

    this.setUpMenu = function () {

        $("#apply").click(function () {
            save(false);
            apply();
        });
        $(":text").click(function () {
            $(this).select();
        });

        $("#dd").click(function () {
            vals.resChange = true;
        });

        $("#next").click(function () {
            $("#firstpage").hide();
            $("#secondpage").show()
            $("#next").hide();
            $("#back").show();

        });
        $("#back").click(function () {
            $("#secondpage").hide();
            $("#firstpage").show()
            $("#back").hide();
            $("#next").show();
        });

        $("#gamedd").hover(0, function () {
            if ($("#gamedd").val() != $("#yaw").val())
                $("#yaw").val($("#gamedd").val());
        });

        $("#myRange").mouseup(function () {
            $("#targetsize").text(Math.round((parseFloat($("#myRange").val()) + 0.2) * 10));
        });


    }

    function apply() {

        if (vals.sens != game.player.currentSens) {
            console.log("sens");
            game.player.updateSensitivity(vals.sens, game.player.currentYaw);
        }


        if (vals.yaw != game.player.currentYaw) {
            console.log("Yaw", vals.yaw);
            game.player.updateSensitivity(game.player.currentSens, vals.yaw);
        }

        if (vals.targetSize != game.world.targetSize) {
            game.world.updateTargetSize(vals.targetSize);
        }

        if (vals.targetColor != game.world.targetColor) {
            game.world.updateTargetColor(vals.targetColor);
        }

        if (vals.crosshairColor != $(".crosshairbar").css('background')) {
            $(".crosshairbar").css('background', vals.crosshairColor);
        }

        if (vals.amount != game.targetManager.maxTargets) {
            game.targetManager.maxTargets = vals.amount;
        }

        if (vals.delay != game.targetManager.delay) {
            game.targetManager.updateDelay(vals.delay);
        }

        if (vals.duration != game.targetManager.duration) {
            game.targetManager.updateTargetDuration(vals.duration);
        }

        if (vals.invertPitch != game.player.invertXRot) {
            game.player.invertXRot = vals.invertPitch;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        if (vals.invertYaw != game.player.invertYRot) {
            game.player.invertYRot = vals.invertYaw;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        if (vals.soundEnabled != game.targetManager.targetSoundEnabled) {
            game.targetManager.targetSoundEnabled = vals.soundEnabled;
        }

        var res = $("#dd").val();

        var width = res.substring(0, res.indexOf("x") - 1);
        var height = res.substring(res.indexOf("x") + 2);

        if (vals.resChange && (height != game.engine.height || width != game.engine.width)) {
            game.launchFullScreen();
            game.engine.setSize(width, height);
            vals.resChange = false;
        }




        $("#form").hide();

        $('#big').hide();

        console.log("Apply: ", vals);

        document.cookie = JSON.stringify(vals);


    }



}