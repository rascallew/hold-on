DROP TABLE IF EXISTS `opinions`;

CREATE TABLE `opinions`(
  `id` int(11) not null auto_increment,
  `openid` varchar(100) not null,
  `src` text default null,
  `wechat` varchar(100) default null,
  `opinion` text not null,
  `create_time` timestamp not null default CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
)default CHARSET=`utf8`;

DROP TABLE IF EXISTS `records`;

CREATE TABLE `records`(
  `id` int(11) not null auto_increment,
  `openid` varchar(100) not null,
  `add` int(11) not null,
  `mark` int(11) not null,
  `note` varchar(100) default null,
  `create_time` timestamp not null default CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
)default CHARSET=`utf8`;