/*
*   @name       Cheated Cookies Taste Aweful
*   @version    1.0
*   @author     jfekendall
*   Largely based on http://codegist.net/code/cookie-clicker-auto-click-reindeer/ and cookie clicker documentation
*/

(function() {
    'use strict';
    
    //Auto-pop wrinklers
    var wrinklerClick= setInterval(function() { 
    for (var i=0;i<10;i++) { 
        if (Game.wrinklers[i].close==1){
            Game.wrinklers[i].hp--;
           }
        } 
    }, 500);
    
    //Auto click reindeer
    setInterval(function() { 
        if (Game.seasonPopup.life > 0) { 
            Game.seasonPopup.click(); 
        } 
    }, 500);
    
    var p = document.querySelectorAll('#products > .product');

    p.forEach(function(e){
        var cbxProductSelector = document.createElement('input');
        cbxProductSelector.id = 'cbautoBuy_'+e.id;
        cbxProductSelector.type = 'checkbox';
        cbxProductSelector.style.zIndex = 1000;
        cbxProductSelector.style.position = 'relative';
        e.insertBefore(cbxProductSelector, null);
    });

    let game = document.getElementById('game');
    let afkinterval = '';
    let autoClicker = '';
    let goldenCookieInterval = '';

    let cbContainer = document.createElement('div');
    cbContainer.style.position = 'absolute';
    cbContainer.style.left = '10px';
    cbContainer.style.top = '10px';
    cbContainer.style.zIndex = 1000;
    cbContainer.style.background = 'rgba(0,0,0,0.4)';
    cbContainer.style.width = '150px';
    cbContainer.style.borderRadius = '5px';
    cbContainer.style.paddingBottom = '10px';
    
    let br = document.createElement('br');
    cbContainer.appendChild(br);
 
    let cbautoCookieClick = document.createElement('input');
    cbautoCookieClick.id = 'cbautoCookieClick';
    cbautoCookieClick.type = 'checkbox';
    cbautoCookieClick.addEventListener('change', autoCookieClick);
    cbContainer.appendChild(cbautoCookieClick);
    let lblautoCookieClick = document.createElement('label');
    lblautoCookieClick.htmlFor = 'cbautoCookieClick';
    lblautoCookieClick.innerText = 'Auto click Cookie';
    cbContainer.appendChild(lblautoCookieClick);

    br = document.createElement('br');
    cbContainer.appendChild(br);

    let cbxGoldenCookie = document.createElement('input');
    cbxGoldenCookie.id = 'cbxGoldenCookie';
    cbxGoldenCookie.type = 'checkbox';
    cbxGoldenCookie.addEventListener('change', goldenCookieClick);
    cbContainer.appendChild(cbxGoldenCookie);
    let lblGoldenCookie = document.createElement('label');
    lblGoldenCookie.htmlFor = 'cbxGoldenCookie';
    lblGoldenCookie.innerText = 'Click Golden Cookie';
    cbContainer.appendChild(lblGoldenCookie);

    br = document.createElement('br');
    cbContainer.appendChild(br);
 
    let cbautoBuyBuildings = document.createElement('input');
    cbautoBuyBuildings.id = 'cbautoBuyBuildings';
    cbautoBuyBuildings.type = 'checkbox';
    cbautoBuyBuildings.addEventListener('change', autoBuyBuildings);
    cbContainer.appendChild(cbautoBuyBuildings);
    let lblautoBuyBuildings = document.createElement('label');
    lblautoBuyBuildings.htmlFor = 'cbautoBuyBuildings';
    lblautoBuyBuildings.innerText = 'Auto buy buildings';
    cbContainer.appendChild(lblautoBuyBuildings);
 
    br = document.createElement('br');
    cbContainer.appendChild(br);
 
    let cbautoBuyUpgrades = document.createElement('input');
    cbautoBuyUpgrades.id = 'cbautoBuyUpgrades';
    cbautoBuyUpgrades.type = 'checkbox';
    cbautoBuyUpgrades.addEventListener('change', autoBuyUpgrades);
    cbContainer.appendChild(cbautoBuyUpgrades);
    let lblautoBuyUpgrades = document.createElement('label');
    lblautoBuyUpgrades.htmlFor = 'cbautoBuyUpgrades';
    lblautoBuyUpgrades.innerText = 'Auto buy upgrades';
    cbContainer.appendChild(lblautoBuyUpgrades);
    game.appendChild(cbContainer);

    br = document.createElement('br');
    cbContainer.appendChild(br);
 
    let cbafk = document.createElement('input');
    cbafk.id = 'cbafk';
    cbafk.type = 'checkbox';
    cbafk.addEventListener('change', afk);
    cbContainer.appendChild(cbafk);
    let lblafk = document.createElement('label');
    lblafk.htmlFor = 'cbafk';
    lblafk.innerText = 'AFK';
    cbContainer.appendChild(lblafk);
    game.appendChild(cbContainer);

    br = document.createElement('br');
    cbContainer.appendChild(br);
 
    let numafk = document.createElement('input');
    numafk.id = 'numafk';
    numafk.type = 'number';
    numafk.addEventListener('change', afk);
    cbContainer.appendChild(numafk);
    let lblnumafk = document.createElement('label');
    lblnumafk.htmlFor = 'cbafk';
    lblnumafk.innerText = 'AFK buying interval';
    numafk.style.width = '30px';
    cbContainer.appendChild(lblnumafk);
    game.appendChild(cbContainer);

    function autoCookieClick(){
        if(cbautoCookieClick.checked){
            autoClicker = setInterval(Game.ClickCookie, 25);
        }else{
            clearInterval(autoClicker);
        }
    }

    function autoBuyBuildings() {
       if(cbautoBuyBuildings.checked) {
            var wanted = [];
            var iterator = 0;
            p.forEach(function(e){
                var auto = document.getElementById('cbautoBuy_'+e.id);
                    if(auto.checked){
                        wanted[iterator] = e;
                        iterator++;
                    }
            });
            if(wanted.length > 0){
                wanted.reverse();
                wanted.forEach(function(e){
                    if(e.classList.contains('enabled')){
                        e.click();
                    }
                });
            }else{
                 let products = document.querySelectorAll('#products > .product.enabled');
                //Goes for the most expensive and works its way down as to maximize return.
                if(products[products.length-1]) {
                    products[products.length-1].click();
                }
            }
        }
    }
 
    function autoBuyUpgrades() {
        if(cbautoBuyUpgrades.checked) {
            let upgrades = document.querySelectorAll('#upgrades > .upgrade.enabled');
            //Goes for the most expensive and works its way down as to maximize return.
            if(upgrades[upgrades.length-1]) {
                upgrades[upgrades.length-1].click();
            }
        }
    }

    function afk() {
        if(cbafk.checked && numafk.value !== ''){
            var interval = (60000*numafk.value);
            clearInterval(afkinterval);
            afkinterval = setInterval(function(){
                for(var i=1; i <= 5; i++){
                    var wanted = [];
                    var iterator = 0;
                    p.forEach(function(e){
                        var auto = document.getElementById('cbautoBuy_'+e.id);
                        
                            if(auto.checked){
                                wanted[iterator] = e;
                                iterator++;
                            }
                    });
                    if(wanted.length > 0){
                        wanted.reverse();
                        wanted.forEach(function(e){
                            if(e.classList.contains('enabled')){
                                e.click();
                            }
                        });
                    }else{
                         let products = document.querySelectorAll('#products > .product.enabled');
                        //Goes for the most expensive and works its way down as to maximize return.
                        if(products[products.length-1]) {
                            products[products.length-1].click();
                        }
                    }
                }
            },interval);
        }else{
            clearInterval(afkinterval);
        }
    }

    function goldenCookieClick(){
    	if(cbxGoldenCookie.checked){
		    goldenCookieInterval = setInterval(function(){ 
		        Game.shimmers.forEach(function(shimmer) { 
		            shimmer.pop() 
		        })
		    }, 500);
		}else{
			clearInterval(goldenCookieInterval);
		}
    }
    setInterval(() => {autoBuyBuildings();autoBuyUpgrades();}, 10);
})();
