class Plan < ActiveRecord::Base
  Days_num_map = {"1d"=>"一天","3d"=>"三天","1w"=>"一周","2w"=>"两周","1m"=>"一月","un_k"=>"不定时"}
  Travel_way_map = {"train"=>"火车/动车","p_car"=>"长途汽车/快客","m_car"=>"自驾游","plane"=>"飞机","foot"=>"徒步"} #出行方式集合 ，如火车，公共汽车，，自驾游，飞机,
  Accommodation_map  = {"h_president"=>"酒店/总统套房","h_5"=>"酒店/五星级","h_4"=>"酒店/四星级",
    "h_2"=>"酒店/二星级","h_1"=>"酒店/一星级","farmhouse"=>"农家旅店","youthhostel"=>"青年旅社"}#住宿条件集合，酒店星级，农家，青年旅舍
  Food_taste_map = {"sea_food" =>"海鲜","light"=>"清淡口味","pungent"=>"辛辣","family"=>"家常"} #食物口味类型，海鲜，辛辣，家常，
  Play_interesting_map ={"nature"=>"自然景观","hummen_history"=>"人文历史","model_technology"=>"现代科技","playground"=>"游乐场"}# 游玩目标，自然景观，人文历史，现代科技
  Play_way_map = {"travel_self"=>"自助游","travel_group"=>"旅游团"}#旅游方式，自助游，旅游团

end
