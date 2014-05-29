var mla_templates = { "": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR]</b>{{/authors}} \
                           {{#title}}"{{title}}." {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                           {{#booktitle}} <i>{{booktitle}}</i>. {{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                           {{#editor}} {{mlaEds}}.{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR].</b> {{/editor}} \
                           {{#location}}{{location}}:{{/location}}{{^location}}<b>[UNKNOWN LOCATION]:</b> {{/location}} \
                           {{#publisher}} {{publisher}},{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                           {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                           {{#pages}}{{pages}}. {{/pages}}{{^pages}}<b>[UNKNOWN PAGES]. </b>{{/pages}}',

                      "unknown": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR]</b>{{/authors}} \
                                  {{#title}}"{{title}}." {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                  {{#booktitle}} <i>{{booktitle}}</i>. {{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                                  {{#editor}} {{mlaEds}}.{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR].</b> {{/editor}} \
                                  {{#location}}{{location}}:{{/location}}{{^location}}<b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                  {{#publisher}} {{publisher}},{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                                  {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                  {{#pages}}{{pages}}. {{/pages}}{{^pages}}<b>[UNKNOWN PAGES]. </b>{{/pages}}',

                      "book": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR]</b>{{/authors}} \
                               {{#title}} <i>{{title}}.</i> {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                               {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                               {{#publisher}} {{publisher}},{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                               {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                               Print.',

                      "article":  '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR]</b>{{/authors}} \
                                   {{#title}} "{{title}}."{{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                   {{#journal}} <i>{{journal}}</i>{{/journal}}{{^journal}} <b>[UNKNOWN JOURNAL].</b>{{/journal}} \
                                   {{#volume}} {{volume}}{{#number}}.{{number}}{{/number}}{{/volume}}{{^volume}} <b>[UNKNOWN VOLUME]</b>{{/volume}} \
                                   {{#year}} ({{year}}): {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                   {{#pages}}{{pages}}.{{/pages}}{{^pages}}<b>[UNKNOWN PAGES].</b>{{/pages}} \
                                   Print.',

                      "inbook": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR]</b>{{/authors}} \
                                 {{#title}}"{{title}}." {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                 {{#booktitle}} <i>{{booktitle}}</i>. {{/booktitle}}{{^booktitle}}<b>[UNKNOWN BOOKTITLE] </b>{{/booktitle}} \
                                 {{#editor}} {{mlaEds}}.{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR].</b> {{/editor}} \
                                 {{#location}}{{location}}:{{/location}}{{^location}}<b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                 {{#publisher}} {{publisher}},{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                                 {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                 {{#pages}}{{pages}}. {{/pages}}{{^pages}}<b>[UNKNOWN PAGES]. </b>{{/pages}}',

                      "translated_book": '{{#authors}} {{authors}}{{/authors}}{{^authors}} <b>[UNKNOWN EDITOR].</b>{{/authors}} \
                                          {{#title}} <i>{{title}}</i>.{{/title}}{{^title}} <b>[UNKNOWN TITLE]</b>.{{/title}} \
                                          {{#translator}} Trans. {{translator}}.{{/translator}}{{^translator}} <b>[UNKNOWN TRANSLATOR]</b>{{/translator}} \
                                          {{#location}}{{location}}:{{/location}}{{^location}}<b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                          {{#publisher}} {{publisher}},{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                                          {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}}',

                      "edited_book": '{{#title}} <i>{{title}}</i>.{{/title}}{{^title}} <b>[UNKNOWN TITLE]</b>.{{/title}} \
                                      {{#authors}} {{authors}}{{/authors}}{{^authors}} <b>[UNKNOWN EDITOR].</b>{{/authors}} \
                                      {{#location}} {{location}}: {{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                      {{#publisher}}{{publisher}},{{/publisher}}{{^publisher}}<b>[UNKNOWN PUBLISHER],</b>{{/publisher}} \
                                      {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}}',


                      "web_published": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                                        {{#title}}<i>{{title}}.</i> {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                        {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                        Retrieved from: {{#url}}{{url}}{{/url}}{{^url}}[UNKNOWN URL]{{/url}}',

                      "proceedings": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                                      {{#title}}"{{title}}." {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                                      {{#editor}} {{mlaEds}}.{{/editor}}{{^editor}}<b>[UNKNOWN EDITOR].</b> {{/editor}} \
                                      {{#location}} {{location}}:{{/location}}{{^location}} <b>[UNKNOWN LOCATION]:</b> {{/location}} \
                                      {{#publisher}} {{publisher}}.{{/publisher}}{{^publisher}} <b>[UNKNOWN PUBLISHER].</b>{{/publisher}} \
                                      {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}} \
                                      {{#pages}}{{pages}}. {{/pages}}{{^pages}}<b>[UNKNOWN PAGES]. </b>{{/pages}}',

                      "misc": '{{#authors}}{{authors}}{{/authors}}{{^authors}}<b>[UNKNOWN AUTHOR].</b>{{/authors}} \
                               {{#title}}<i>{{title}}.</i> {{/title}}{{^title}} <b>[UNKNOWN TITLE].</b> {{/title}} \
                               {{#year}} {{year}}. {{/year}}{{^year}} <b>[UNKNOWN YEAR].</b> {{/year}}'
};
