var endnote_templates = { "": "%0 Unknown<br>
                               {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
                               %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
                            	 %B {{#booktitle}}{{booktitle}}{{/booktitle}}{{^booktitle}}UNKNOWN{{/booktitle}}<br> \
                            	 %P {{#pages}}{{pages}}{{/pages}}{{^pages}}UNKNOWN{{/pages}}<br> \
                            	 %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
                            	 %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
                            	 %E {{#editor}}{{editor}}{{/editor}}{{^editor}}UNKNOWN{{/editor}}<br> \
                            	 %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "unknown": "%0 Unknown<br>
                                      {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
                                      %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
                                  	  %B {{#booktitle}}{{booktitle}}{{/booktitle}}{{^booktitle}}UNKNOWN{{/booktitle}}<br> \
                            	        %P {{#pages}}{{pages}}{{/pages}}{{^pages}}UNKNOWN{{/pages}}<br> \
                            	        %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
                            	        %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
                            	        %E {{#editor}}{{editor}}{{/editor}}{{^editor}}UNKNOWN{{/editor}}<br> \
                            	        %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "book": "%0 Book<br> \
                                   {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
                                   %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                 %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
 	                                 %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
 	                                 %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "article": "%0 Journal Article<br>
	                                    {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                    %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                    %J {{#journal}}{{journal}}{{/journal}}{{^journal}}UNKNOWN{{/journal}}<br> \
	                                    %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
 	                                    %V {{#volume}}{{volume}}{{/volume}}{{^volume}}UNKNOWN{{/volume}}<br> \
	                                    %P {{#pages}}{{pages}}{{/pages}}{{^pages}}UNKNOWN{{/pages}}",

                          "inbook": "%0 Book Section<br> \
	                                   {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                   %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                   %B {{#booktitle}}{{booktitle}}{{/booktitle}}{{^booktitle}}UNKNOWN{{/booktitle}}<br> \
	                                   %P {{#pages}}{{pages}}{{/pages}}{{^pages}}UNKNOWN{{/pages}}<br> \
	                                   %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
	                                   %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
	                                   %E {{#editor}}{{editor}}{{/editor}}{{^editor}}UNKNOWN{{/editor}}<br> \
	                                   %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "translated_book": "%0 Trasnlated Book<br> \
	                                            {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                            %T {{#title}}{{title}} Trans. {{translator}}{{/title}}{{^title}}UNKNOWN TITLE Trans. {{translator}}{{/title}}<br> \
	                                            %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
	                                            %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
	                                            %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "edited_book": "%0 Edited Book<br> \
	                                        {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                        %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                        %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
	                                        %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
	                                        %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}", 

                          "web_published": "%0 Edited Book<br> \
	                                          {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                          %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                          %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
	                                          %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
	                                          %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "proceedings": "%0 Proceedings<br> \
                      	                  {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                        %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
	                                        %P {{#pages}}{{pages}}{{/pages}}{{^pages}}UNKNOWN{{/pages}}<br> \
	                                        %I {{#publisher}}{{publisher}}{{/publisher}}{{^publisher}}UNKNOWN{{/publisher}}<br> \
	                                        %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \
	                                        %E {{#editor}}{{editor}}{{/editor}}{{^editor}}UNKNOWN{{/editor}}<br> \
	                                        %C {{#location}}{{location}}{{/location}}{{^location}}UNKNOWN{{/location}}",

                          "misc": "%0 Generic<br> \
	                                 {{#authors}}{{{enoteAuthors}}}{{/authors}}{{^authors}}UNKNOWN{{/authors}}<br> \
	                                 %T {{#title}}{{title}}{{/title}}{{^title}}UNKNOWN{{/title}}<br> \
                                   %D {{#year}}{{year}}{{/year}}{{^year}}UNKNOWN{{/year}}<br> \"
}


  
