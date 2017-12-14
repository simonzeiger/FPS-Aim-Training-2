MenuInputManager = function (game) {
    //TODO: reset to defualts button
    var _this = this;
    var sensSlct = $("#sens");
    var tarSizeSlct = 1;
    var yawSlct = $("#yaw");
    var amountSlct = $("#amount");
    var delaySlct = $("#delay");
    var durationSlct = $("#duration");
    var rangeSlct = $("#myRange");
    var invertPitchSlct = $("#invertx");
    var invertYawSlct = $("#inverty");
    var soundEnabledSlct = $("#sound");
    var targetColorSlct = $("#targetcolor");
    var crosshairColorSlct = $("#crosshaircolor");

    var DefualtVals = function () {
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
        return this;
    };

    var vals;
    if (document.cookie != null && document.cookie !== undefined && document.cookie !== "" && document.cookie !== "undefined") {
        vals = JSON.parse(document.cookie);
        reset();
        apply();
    } else {
        vals = new DefualtVals();
    }


    function save() {

        if (sensSlct.val() > 0 && !isNaN(sensSlct.val())) {
            vals.sens = sensSlct.val();
        } else {
            sensSlct.val(vals.sens);
        }

        if (yawSlct.val() > 0 && !isNaN(yawSlct.val())) {
            vals.yaw = yawSlct.val();
        } else {
            yawSlct.val(vals.yaw);
        }

        if (!isNaN(amountSlct.val()) && amountSlct.val() > 0 && (amountSlct.val() % 1 === 0)) {
            vals.amount = amountSlct.val();
        } else {
            amountSlct.val(vals.amount);
        }

        if (!isNaN(delaySlct.val()) && delaySlct.val() > 0) {
            vals.delay = delaySlct.val();
        } else {
            delaySlct.val(vals.delay);
        }

        if (!isNaN(durationSlct.val()) && durationSlct.val() > 0) {
            vals.duration = durationSlct.val();
        } else {
            durationSlct.val(vals.duration);
        }

        vals.targetSize = parseFloat(rangeSlct.val()) + 0.2;



        vals.invertPitch = invertPitchSlct.is(':checked');



        vals.invertYaw = invertYawSlct.is(':checked');


        vals.soundEnabled = soundEnabledSlct.is(':checked');


        vals.targetColor = targetColorSlct.val();



        vals.crosshairColor = crosshairColorSlct.val();

    }

    
    this.reset = function() {
        reset();
    };

    function reset() {
        sensSlct.val(vals.sens);
        amountSlct.val(vals.amount);
        delaySlct.val(vals.delay);
        durationSlct.val(vals.duration);
        yawSlct.val(vals.yaw);
        invertPitchSlct.prop("checked", vals.invertPitch);
        invertYawSlct.prop("checked", vals.invertYaw);
        soundEnabledSlct.prop("checked", vals.soundEnabled);
        rangeSlct.defaultValue = vals.targetSize - 0.2;
        rangeSlct.val(vals.targetSize - 0.2);
        $("#targetsize").text(Math.round(vals.targetSize * 10));
        targetColorSlct.val(vals.targetColor);
        crosshairColorSlct.val(vals.crosshairColor);
        $("#gamedd").val(vals.yaw);
    }

    this.setUpMenu = function () {

        $("#apply").click(function () {
            save();
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
            $("#secondpage").show();
            $("#next").hide();
            $("#back").show();

        });
        $("#back").click(function () {
            $("#secondpage").hide();
            $("#firstpage").show();
            $("#back").hide();
            $("#next").show();
        });

        var gameDDSlct = $("#gamedd");
        gameDDSlct.hover(0, function () {
            if (gameDDSlct.val() !== yawSlct.val())
                yawSlct.val(gameDDSlct.val());
        });

        rangeSlct.mouseup(function () {
            $("#targetsize").text(Math.round((parseFloat(rangeSlct.val()) + 0.2) * 10));
        });


    };

    function apply() {

        if (vals.sens !== game.player.currentSens) {
            game.player.updateSensitivity(vals.sens, game.player.currentYaw);
        }


        if (vals.yaw !== game.player.currentYaw) {
            game.player.updateSensitivity(game.player.currentSens, vals.yaw);
        }

        if (vals.targetSize !== game.world.targetSize) {
            game.world.updateTargetSize(vals.targetSize);
        }

        if (vals.targetColor !== game.world.targetColor) {
            game.world.updateTargetColor(vals.targetColor);
        }

        // noinspection JSJQueryEfficiency
        if (vals.crosshairColor !== $(".crosshairbar").css('background')) {
            $(".crosshairbar").css('background', vals.crosshairColor);
        }

        if (vals.amount !== game.targetManager.maxTargets) {
            game.targetManager.maxTargets = vals.amount;
        }

        if (vals.delay !== game.targetManager.delay) {
            game.targetManager.updateDelay(vals.delay);
        }

        if (vals.duration !== game.targetManager.duration) {
            game.targetManager.updateTargetDuration(vals.duration);
        }

        if (vals.invertPitch !== game.player.invertXRot) {
            game.player.invertXRot = vals.invertPitch;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        if (vals.invertYaw !== game.player.invertYRot) {
            game.player.invertYRot = vals.invertYaw;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        if (vals.soundEnabled !== game.targetManager.targetSoundEnabled) {
            game.targetManager.targetSoundEnabled = vals.soundEnabled;
        }

        var res = $("#dd").val();

        var width = res.substring(0, res.indexOf("x") - 1);
        var height = res.substring(res.indexOf("x") + 2);

        if (vals.resChange && (height !== game.engine.height || width !== game.engine.width)) {
            game.launchFullScreen();
            game.engine.setSize(width, height);
            vals.resChange = false;
        }

        $('#form').hide();

        $('#big').hide();

        document.cookie = JSON.stringify(vals);


    }


};