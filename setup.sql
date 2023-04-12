CREATE TABLE IF NOT EXISTS `search_history` (
  `websiteURL` varchar(2048) NOT NULL,
  `imageLink` varchar(2048),
  `websiteTitle` varchar(200),
  PRIMARY KEY (`websiteURL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;