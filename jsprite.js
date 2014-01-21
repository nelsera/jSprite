(function($, undefined) {    
    'use strict';

    var sprite_tempo_transicao = 50; //milsec
    var sprite_tempo_reload = 3; //segundos
    var sprite_transicao_timeout, sprite_reload_timeout;
    var sprite_item_posicao = 0;
    var sprite_item_top = 0;
    var sprite_item_left = 0;
    var sprite_hover = false;

    function animaSprite(elemento, width, height, item_linha, total, tempo_transicao, tempo_reload, callback){
        clearTimeout(sprite_transicao_timeout);
        clearTimeout(sprite_reload_timeout);

        tempo_transicao = (typeof tempo_transicao !== "undefined") ? tempo_transicao : sprite_tempo_transicao;
        tempo_reload = (typeof tempo_reload !== "undefined") && (tempo_reload != 0) ? tempo_reload : 0;

        //console.log(tempo_reload);

        //console.log(tempo_transicao);

        var sprite_bg_width = width;
        var sprite_bg_height = height;
        var sprite_bg_linha = item_linha;
        var sprite_bg_total = total;

        if(elemento.length && elemento.is(":visible")){
            if(sprite_item_posicao < (sprite_bg_total - 1)){
                sprite_item_posicao++;

                var linha = (sprite_item_posicao % sprite_bg_linha) / 100;

                sprite_item_left = sprite_item_left + sprite_bg_width;

                if(linha == 0){
                   sprite_item_top = sprite_item_top + sprite_bg_height;
                   sprite_item_left = 0;
                }

                $('.animation').css({
                    'background-position' : '-' + sprite_item_left + 'px -' + sprite_item_top + 'px'
                });

                sprite_transicao_timeout = setTimeout(function(){
                    animaSprite(elemento, width, height, item_linha, total, tempo_transicao, tempo_reload, callback);
                }, tempo_transicao);
            }else{
                if(tempo_reload){
                    sprite_reload_timeout = setTimeout(function(){
                        sprite_item_posicao = 0;
                        sprite_item_top = 0;
                        sprite_item_left = 0;

                        elemento.css({
                            'background-position' : '0 0'
                        });

                        animaSprite(elemento, width, height, item_linha, total, tempo_transicao, tempo_reload, callback);
                    }, tempo_reload * 1000);
                }

                if(callback){
                    callback();
                }
            }
        }
    }

    function sprite(elemento, width, height, item_linha, total, tempo_transicao, tempo_reload, callback){
        sprite_item_posicao = 0;
        sprite_item_top = 0;
        sprite_item_left = 0;

        tempo_transicao = (typeof tempo_transicao !== "undefined") ? tempo_transicao : sprite_tempo_transicao;
        tempo_reload = (typeof tempo_reload !== "undefined") && (tempo_reload != 0) ? tempo_reload : 0;

        animaSprite(elemento, width, height, item_linha, total, tempo_transicao, tempo_reload, callback);
    }

    sprite($('.animation'), 330, 500, 9, 65, 30, 2);
}(jQuery));
