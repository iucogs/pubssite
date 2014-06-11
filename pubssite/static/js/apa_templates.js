var apa_templates = {"": "{{#authors}}{{authors}}{{/authors}} {{^authors}}<b>[UNKNOWN AUTHOR(S)].</b> {{/authors}} \
                          {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                          {{#title}}{{title}}. {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                          {{#editor}} In {{apaEds}},{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR],</b> {{/editor}} \
                          {{#booktitle}} <i>{{booktitle}} </i>{{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                          {{#pages}}(pp. {{pages}}).{{/pages}}{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}} \
                          {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                          {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "unknown": "{{#authors}}{{authors}}{{/authors}} {{^authors}}<b>[UNKNOWN AUTHOR(S)].</b> {{/authors}} \
                          {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                          {{#title}}{{title}}. {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                          {{#editor}} In {{apaEds}},{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR],</b> {{/editor}} \
                          {{#booktitle}} <i>{{booktitle}} </i>{{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                          {{#pages}}(pp. {{pages}}).{{/pages}}{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}} \
                          {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                          {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "book": "{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                              {{#year}} ({{year}}). {{/year}}{{^year}}<b>[UNKNOWN YEAR]. </b>{{/year}} \
                              {{#title}}<i>{{title}}</i>. {{/title}}{{^title}} <b>[UNKNOWN TITLE]. </b>{{/title}} \
                              {{#location}}{{location}}: {{/location}}{{^location}}<b>[UNKNOWN LOCATION]:</b> {{/location}} \
                              {{#publisher}}{{publisher}}.{{/publisher}}{{^publisher}}<b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "article": "{{#authors}}{{authors}}{{/authors}} {{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                                 {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                 {{#title}}{{title}}.{{/title}}{{^title}}<b>[UNKNOWN TITLE]. </b>{{/title}} \
                                 {{#journal}} <i>{{journal}},{{/journal}}{{^journal}} <b>[UNKNOWN JOURNAL]</b> {{/journal}} \
                                 {{#volume}} {{volume}}</i>{{#number}}({{number}}){{/number}}, {{/volume}}{{^volume}}<b>[UNKNOWN VOLUME]</b> {{/volume}} \
                                 {{#pages}} {{pages}}{{/pages}}.{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}}",

                     "inbook": "{{#authors}}{{authors}}{{/authors}} {{^authors}}<b>[UNKNOWN AUTHOR].</b> {{/authors}} \
                                {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                {{#title}}{{title}}. {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                {{#editor}} In {{apaEds}},{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR],</b> {{/editor}} \
                                {{#booktitle}} <i>{{booktitle}} </i>{{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                                {{#pages}}(pp. {{pages}}).{{/pages}}{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}} \
                                {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "translated_book": "{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b> {{/authors}} \                                         {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                         {{#title}}<i>{{title}}</i>. {{/title}}{{^title}}<b>[UNKNOWN TITLE].</b> {{/title}} \
                                         {{#translator}}({{apaTrans}}, Trans.){{/translator}}{{^translator}}<b>[UNKNOWN TRANSLATOR].</b>{{/translator}} \
                                         {{#location}} {{location}}: {{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \ 
                                         {{#publisher}}{{publisher}}.{{/publisher}}{{^publisher}}<b>[UNKNOWN PUBLISHER].{{/publisher}}</b>",

                     "edited_book": "{{#authors}}{{authors}} {{/authors}}{{^authors}}[UNKNOWN AUTHOR]{{/authors}} \
                                     {{#year}} ({{year}}). {{/year}}{{^year}}<b>[UNKNOWN YEAR]. </b>{{/year}} \
                                     {{#title}}<i>{{title}}</i>. {{/title}}{{^title}} <b>[UNKNOWN TITLE]. </b>{{/title}} \
                                     {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                     {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "web_published": "{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b> {{/authors}} \
                                       {{#title}} <i>{{title}}.</i> {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                       {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                       Retrieved from: {{#url}}{{url}}{{/url}}{{^url}}[UNKNOWN URL]{{/url}}",

                     "proceedings": "{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b> {{/authors}} \
                                     {{#year}} ({{year}}). {{/year}}{{^year}}<b>[UNKNOWN YEAR]. </b>{{/year}} \
                                     {{#title}}<i>{{title}}</i>. {{/title}}{{^title}} <b>[UNKNOWN TITLE]. </b>{{/title}} \
                                     {{#pages}} {{pages}}{{/pages}}.{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}} \
                                     {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                     {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}}",

                     "misc": "{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                              {{#year}} ({{year}}). {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                              {{#title}}{{title}}. {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}}"
                    };
