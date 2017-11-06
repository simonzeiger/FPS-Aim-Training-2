MenuInputManager = function (game) {
    var sens = DEF_SENS;
    var targetSize = .75;
    var yaw = 0.022;
    var amount = 25;
    var delay = .5;
    var duration = .75;
    var invertPitch = false;
    var invertYaw = false;
    var resChange = false;

    function save(page) {

        targetSize = $("#myRange").val() + .25;

        if ($("#sens").val() > 0 && !isNaN($("#sens").val())) {
            sens = $("#sens").val();
        } else {
            $("#sens").val(sens);
        }

        if ($("#yaw").val() > 0 && !isNaN($("#yaw").val())) {
            yaw = $("#yaw").val();
        } else {
            $("#yaw").val(yaw);
        }

        if (!isNaN($("#amount").val()) && $("#amount").val() > 0 && ($("#amount").val() % 1 === 0)) {
            amount = $("#amount").val();
        } else {
            $("#amount").val(amount);
        }

        if (!isNaN($("#delay").val()) && $("#delay").val() > 0) {
           
            delay = $("#delay").val();
        } else {
            $("#delay").val(delay);
        }

        if (!isNaN($("#duration").val()) && $("#duration").val() > 0) {
            duration = $("#duration").val();
        } else {
            $("#duration").val(duration);
        }

        targetSize = parseFloat($("#myRange").val()) + 0.25;

        invertPitch = $("#invertx").is(':checked');

        invertYaw = $("#inverty").is(':checked');


    }

    this.reset = function () {
        $("#sens").val(sens);
        $("#amount").val(amount);
        $("#delay").val(delay);
        $("#duration").val(duration);
        $("#yaw").val(yaw);
        $("#invertx").prop("checked", invertPitch);
        $("#inverty").prop("checked", invertYaw);
        $("#myRange").val(targetSize - .25);
    }

    this.setUpMenu = function () {

        $("#apply").click(function () {
            apply();
        });
        $(":text").click(function () {
            $(this).select();
        });

        $("#dd").click(function () {
            resChange = true;
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
            $("#targetsize").text(parseFloat($("#myRange").val()) + 0.25);
        });

    }

    function apply() {
        save();

        if (sens != game.player.currentSens) {
            game.player.updateSensitivity(sens, game.player.currentYaw);
        }


        if (yaw != game.player.currentYaw) {
            game.player.updateSensitivity(game.player.currentSens, yaw);
        }

        if(targetSize != game.world.targetSize){
            game.world.updateTargetSize(targetSize);
        }

        if (amount != game.targetManager.maxTargets) {
            game.targetManager.maxTargets = amount;
        }

        if (delay != game.targetManager.delay) {
            game.targetManager.updateDelay(delay);
        }

        if (duration != game.targetManager.duration) {
            game.targetManager.updateTargetDuration(duration);
        }

        if (invertPitch != game.player.invertXRot) {
            game.player.invertXRot = invertPitch;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        if (invertYaw != game.player.mouseInvert) {
            game.player.invertYRot = invertYaw;
            game.player.updateSensitivity(game.player.currentSens, game.player.currentYaw);
        }

        var res = $("#dd").val();

        var width = res.substring(0, res.indexOf("x") - 1);
        var height = res.substring(res.indexOf("x") + 2);

        if (resChange && (height != game.engine.height || width != game.engine.width)) {
            game.launchFullScreen();
            game.engine.setSize(width, height);
            resChange = false;
        }





        $("#form").toggle();

        $('#big').toggle();


    }



}