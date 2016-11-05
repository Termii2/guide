var attack_mode=true

setInterval(function(){
    
    //uses and buys a healpotion if below 40% health. The same goes for mana potions
    handlePotions(0.4, 0.4);
    loot();

    if(!attack_mode || character.moving) return;

    var target=get_targeted_monster();
    if(!target){
        target=get_nearest_monster({min_xp:100,max_att:120});
        if(target) change_target(target);
        else{
            set_message("No Monsters");
            return;
        }
    }

    if(!in_attack_range(target)){
        move(
            character.real_x+(target.real_x-character.real_x)/2,
            character.real_y+(target.real_y-character.real_y)/2
            );
        // Walk half the distance
    }
    else if(can_attack(target)){
        set_message("Attacking");
        attack(target);
    }

},1000/4); // Loops every 1/4 seconds.

function handle_potions(percent_hp, percent_mp){
   if(new Date() < parent.next_potion){
      return;
   }
   if(character.hp / character.max_hp < percent_hp){
      buy('hpot0', 1);
      parent.use('hp');
   }
   else if(character.mp / character.max_mp < percent_mp){
      buy('mpot0', 1); 
      parent.use('mp');
   } 
}
