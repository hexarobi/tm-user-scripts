// ==UserScript==
// @name         TheZebra Color-Coded Environments
// @namespace    http://thezebra.com/
// @version      1.12
// @author       Tyler Chamberlain <tchamberlain@thezebra.com>
// @description  Add color-coded favicons and header divs on TheZebra's development environments
// @updateURL    https://github.com/hexarobi/tm-user-scripts/raw/main/color_coded_environments.user.js
// @downloadURL  https://github.com/hexarobi/tm-user-scripts/raw/main/color_coded_environments.user.js
// @match        https://*.thezebra.dev/*
// @match        http://localhost:*/*
// @match        http://127.0.0.1:*/*
// @match        http://0.0.0.0:*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA9dJREFUWEftVmtIU2EYfs48a27Oy7xmSs4y1LxDIUVFPywqCsqKTFgX0xYIElH0wx9ZUPSjon5ELrqYXU2qH0oQURHZDSozWbm8ZF7W0C2ntrm5y4mjZm7nnM8tgv707cdh5zzv+z7v837f+37U4mMvGfzDRf0n4K1ArlIOhTzQsyhuJ+B2jb2jKGrs+cPmwPMvVrhBISVagjmRXjZeZf2gt6LH7OAUm1OCutIMhIcECe6KbqMFV1704FHLAEZdgExM4ZY6CxHBwgQYhoG6qglag+3PCYw6Xbj09CtuvumD0/3bj3ppLLYtSSBu44fNBlTUd/JiOArUl2ZCESLzAOsHrCi/o8PnfrvH+5nBNG6osyER04IE7A4XCjWNMAw7/4zAp95B7K/VwTwyJe0JV4fXJSIvPYaYfXXDV2iefRPEEBX42DOIvTU6WEa5wTNipTi3PXNyU/JFMA3bUKBpgtUh3GoECfSaLCip1mLQxg1OgYFGlYq0+DBi9sfrdahrHiBieAnIpDNQfLkZHSbPmv/ytDI1DIfWpxAdtxmGsLNKCzczfmyFFi+BKy/1qH1n5LWR0MDNkizEhEmJjsuufcDbbisRM9ZXvBvRyXwlDtztBFf4cV87FsWgZHki0XGDrh8H77ZPG5yXQFywCL3D/OEjgwJwS50DKSuDwHK63FCdb0QXT9fjM/FrGJWvTsCa7FhiZrdfd+PM416fsudVQMgyOToQF4qyIJqYBXy4IesotlQ2Ysju+4T3UQEGZ7cmI1sZTszszIM23BbYvD6fAj7g8nkhOLppPjF4l9EC1cVmjzkx1UBKAyM83XhaBcQi4HpJBuLChSckG+hgjRYNHcO8JNnNuzZdgarX3KM9LYHChVEozZtLzP5thwllNa2CmCPrlNCbbah8ZuBgiATCpCLU7MmBPFAs6NztZlB08T1ajfxdMy85FIfzU3G1odN/AvtXxGPDgnhi9nXv9Dj+oIsXMydiBjTbMyGT0P4TYI2rirMRIBIJErDaHSiofA+Tdfy6NnXNDBbjnGo+okPHW7bfCpzanITcpEhi9ponHah+1cfBxIXSOL01DbMUv+eFXwQWJQbhREEGMbjBPILC802weyWfFSfD0fxkKOQSD3ufCQRQQPWudCij5EQCFfc+4WHL4CSGFgGq3BjsWJoAOoBbNp8JbMyJxL5VScTg2m4z1NdawDZc9nKybF4odi+bDWW0MGmfCagWRkzKx16nPdbE3/va72g32hERCKxJVyBWIQPLhmF/DEDRYoDyVOHJxz686bL41weIMvylj9N2wr8UR9DNfwI/AWp5ofBEjHKVAAAAAElFTkSuQmCC
// @grant        none
// @run-at       document-start
// ==/UserScript==


// Define colors with favicons and color hexcodes
var colors = {
    "red": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA75JREFUWEftl11IU2EYx//nOLe5qSvRVbrSma75kReRYVReSIWIXVgRESpFkndeeJEJRl9WFkFJN1FQFEitDxDqal0IasUgE4Ytt/mxLDOdMjbLfej2xhEr1znn3SZBN73bYNv7f/7P733es+e8Y/oAgn84mP8Af1ZAWV4OmVodtikLDAPuxT2Wngh4PPB3doIJBiHdtg2ywkLqRnp7e7Fgs/E0vC3YNOWEMi1V1GxuaAgTFy/B/egh4POBSU5Gvs0G2Zo1ojGEEFh27IT/zeuVAwT9fnw+fx7T166BCQR+GaVdvoz1p05RVz9lMODz4cOCGl4F9E4nFKnhFfA6HBg+cACBd+/CTOK0WhRYLJDI5aIAQZ8PA3l5CDocKwPw9PVhpKICoakpnoHGYID60CHq6j+1tcHZ3CyqoVbA8/YtRnbvRsjt5hnIduxEfk83GIYRNfdPTuK9Tgd4PLEDzI2MwFpSAuJ08oIJwyDHZIKquJi6+uET9XDfuU3VCFZAplTCUlKCebNZMDippga5Dx5QjWfNZti2bFn8mdKGIMBk60W42m8IxykUyLNakaDRUI0te/fC9/JlxCbPA0g3GjFeXg4mFBIMTj1zBhvOnqUaT794gbF9+yIm5wQ8ACY3F8RuFwxmMzJQaLVColSKmofm5zFQVISFwcGVAdCi0u/fx9raWqrx+M2bmGxoiCq5YAXEIqVbt6LAZALDsqLmAZcL77kKzsz8XQDuwJDd3Y3Vu3ZRjUcbG+G6fj3q5FFXIPHgQeiePKEaf7fbYeXuiMvuE8sDSFIymFl+Q4p8IJHJoLdYoMjOpgIMVlVhrrNT9OJV1dXBde4cbz4iQMrJJmRdaaMmd3V1YbSsTFSjMTyG3zEKZ1NTbACsWo0Cmw3xKpWoOQkGMVBcjPn+fkFN0pEjyO3owKerV2MHWHfrFtbV11NX//XuXXw5flxQE19UhLxXryBJTIwdQLJ5Mwr7+8HGxYkCLHz7hgGdDqGJCZ5GkpUFXU8P5EstO+YKZBmNSNmzh7r6j6dPY6a1lZ88Jwc6oxFyrfbXXEwAispK6J8/pyb3jo3hg14PeL1hOnlpKTY+fQpZWlrY91EDkPh46M1mKDlzyrBXV2O2o+O3QipFanMzNC0tYCUSXmTUAKsbGqBtb6cmd5tMGN6+HSAEhGWRVLUf6a0XkEiBjhpgVUsLpD/LR37/a1t8t/TZfe8eAmYzSIYGqmNHkZCZuQjMabgjuJQQsMtiubnpZ8/gFTgfRGxEMTX2FYj/A/zzCvwAA0aRsN2y4UsAAAAASUVORK5CYII=",
        "hexcode": "#e06666"
    },
    "orange": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA69JREFUWEftl11sFFUUx//33tmdnZ3d1lKEVDYELPEDiXwliIoJGgKIfNaaKrZCkQeQBwgEY6KJD34FIw8q+EBKgVhoU76tCRXSxJJotBCVVDRtykObQpWvhe12d2d25l5TIbXbmbm725jwwj5ssjP/c87vntnz37Mk/uVsgXv4IvcBRnZARJ6GTx+T8VBMDlj8ziUCMvgGKxWH2nsWFBx28VSIMaXSB0n/vgAa63FoHI+AvnEaWkEmwPAo82YPzPO1EF2nQbkJrgShVR6HEir2BBBCoL9xHdi19tEDcMtE4qc9EBfqQIX1X6I5m6DPqZaePvHndxAt77pqHB1ga84gEC7KEKdvXUbq1NugNzoyrtt6CfTKI2A+1ROApw3E68rBBvpGB2D0/QHz282gRtTZvgUfI/jYQunpB37eB5zb7amRdsDou4h00yYQM+5IYI+bjvArNSCEeCa34jeQrFsFaiXyBzCjvTCOrAU1bjmCBQh8ZfugPjRNevr+Mx+CdpyQalw74A9oiDeuBYt2uQbzKS8ivPgDaWLjaifSjZUguDu/HmpXAOv8XpCLDe7FWQCB14/CVzBeChA7+hZYX1tWk3cAWIu/AGve4k0+az30ZzZIEye7zoI3b81a/F9jG+mEph6Bf6DXNdjWHoRedQzMr3mbjm2h/2AFWKx7dACyKDL/fQSnLZOP3S8NwI+f5VTctQNekbz4cYRePQBCqPfYJWNIfr0K1Lz9/wIMLgxs+R5oE2fJx+77naC/1+dcPOcO8EkvILz0U2li82Y3jPqKzN+JYREWC0KxnYaUdSHh1Af1tcPwF0XkY/fNNrCeVs8vr3h0BZTfahz3swKI6VUIPbdZWjzVfQ5200ZPDV3wCezYZZC2XfkBcLUIwarjYIGQ99hxjv76SrBop7txPbwI4SUfId62P38AzHsH+oxy6ekT7SchWt1t2S6aAr28FkwN5g9gP1CK8OpDIJR5AthGAgN1ZWDJ6w6NCJUgUFYD5a5l590B+tIuaJPnSk8f/+ErkF9rHRo7HEFw5W4ohROG7uUFYEeeRcHKz6XF07f/QurQy6C2kaHj42dCW7IDyojFNmcAThjUigb4x06Wm86p90AvNQ9pOFFAZ1ZDe+pNUKY4YnMGEE9UIPT8dmlx40o70sfWgUBAgAKT5sM/d6MUOmeA9JPVUPQ7S6nI+NM27ENHE2i0C4Y6FnhkGZTCkiHgwRVcVQA2YlNLdbaAXnHuB1mNKC9jH4X4PsA978A/DoOdUNv3ZEEAAAAASUVORK5CYII=",
        "hexcode": "#f49236"
    },
    "yellow": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA75JREFUWEftlltsFFUYx/9nZmdv3XbZW0tJITQ1WgMRkAiNRgIkECBFgw0NqIuFPhghPBBIeBEfjE3gBSNBDRDutLBASYoGrCVEBWJojVqtyqU8gKVlW/badrezMzuHDDXNLjNzuts08YXzstk5/+///b7vzJxzSN++1yj+x0GeAzzbAX56FYQCT9aiSGlAVgCiPiWjv9LIELiea+CgAN6XwbkqmAupBDuB+L8ajWYJnB98B1uR29BMDD/AYMdRSN1tIEoK1GSH198MwZENnWlAKUUwUA8MdE0cQJFTiP58CCOdjeCoPGZkWbAZroV1zOrj/3yPxJWPdTXaDtS1wlboyhKnor2IXNoJGrqd9ZwWlKLYfxa8YDEEUCQRwZO1IMN9EwNI9v2N6DfbQMSIxsC+rAFFlcuY1UduHoPY/pWhhtmBZN9fiF3cCqSGtGtX/AqKaw+BkKevpu6QhkJ4fLIGRE7kDyBGehA+twlEjGqCKQicNUdgnzaLWf3jtgbIt1qYGt0OmK02DAQ2ApF7usH8CyvgW/kp0zjZfxfRgB9E/UwZQxcg8csRSF0B3TDKW+F5/xzMRSVM42DzFtDeDqZGndQAmFd+AfHyNkNy8/x6uF//kGk82H0Nw5e3j5tcF0AuKINpuEe/epsPxRvOgzfbjD+7tIzgqfUg8fsTA2BF2ZZ8AufsaqZx9NczGLmxN6fkuh0wjPRUomT9MRDCGUrkZBwDJ94BScUnF0C9MBS+fQCOGfOYxqEf9kL680zOyXPuAD9zCXyr9zCN1UMq3LQOJOOcyAxI83bwae2GNO6FhHIC3O8GYHGVMQH6W3ZAefCT4ctreuktpH8/rJkfF0CY44dn0VZm8uH7HRi8uMVQo54ZcqwXqfYv8wOgVhd8/maYrA5Dc6ooCJ7eAITv6Gr4iuXwrfoM4ZvH8wewvbkTzrk1zOpjf7Qg+WODvsZVAd/aw+At9vwB6JQKTH3vFAjHGwKkxQT61dMuGdJqHKVw1xwc27Lz7oCjeh8c5VXM6sPXv0bqt6MaDS0sg3fNfgjOaWNzeQGQsjdQsuZzZvJU7BFCjWtB0mKWjkydC/eq3RAKsu+VOQNQwsO1rglWbzkTYODSLqTvtY5pKDHB+modnAs3geNNmticAYRZtfAs3cFMnnjYhdiFehBQqJcTU/liFFZ9BKt3pmFczgDcnDoI9tFLqWqfOeh/f6Xb3wKRbkgWL0wvVsMypXRU/3SewswDfOaRQYGhu1ehPGzPbx9gtmGSJsfdCScpj6HNc4Any7+j0O0ovEsAAAAASUVORK5CYII=",
        "hexcode": "#f1c232",
    },
    "green": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA8lJREFUWEftl2tIU2EYx/9ny7npLmouXaVdLLsX2QWzRMkyJxWBFIJ9KKIyoyIZGoWXJE3LoMiyG1EoBGpQWHgjwVo3u9BFsjRaabmcmul0zbnthJesec553SToS+fDPuz9P//39zzve97nPVRcwXoa//Ch/gMMr8BM+ULIXNxsFsVqoUFbBv6iqP5fGHq68ab1CWiKho90GhQSX+JCatpr0WLQMjSMJchQXoFM7M5p1tzRhNI3BXj+RQ0z3QtnvggpEbmQuXDH0DSN4xUJ+NRRN3qAXnMvbr++hjvvb8CKwXIAWDtrM5RzNxKzr9bcxdWnJ1g1LBW4CpnYdgla9V9x8UEmPndqbEzchXIkK89CMEbACWAym5BWEod2Y8voAD621iNXnYau3k6GwZbFKiyZEkzMvqSmELdq8zk1xApoWuqQo06B0WxgGEx2mwnVqkxQA7uS9ekwtONw6S70WH44DqDr1CK7MgHdLJn3vQWq0CxMkc8gZp//KAcPGyuIGtYKiIQiHKtQQdvVwBq8eEIItgbFE40bv2mQdSceNKyOA5S9LUSV5hZroBNPgOQ1Z+EhlhONT1Ymob7t1YiHPKMCsUuTcL76CGiwt4gI/01YtyCGaPyyoRoXHqePOHn/kTb8JPRw9sK3nmbWYKnAA6mRuXB2EnKamy1mpJfugc7QNDoAUlTMwr0ImhZGNK6sLcb1mkt2Tc5aAa7IiVI/HAjPBkXxOM27jXqklsTCYO76+wD7VqTDXzGXaFzw9CLn5uUKtOs+sMB7GXYEHyBO/rXjCzIq9sDyq20OUwt4QpisRobHiAB8agySwnMglyqIALlVR1Cje8K5eQN9w1D+vtBxgJV+GxAVsJU4+VvtS5xWJ3Nq+npGW3czimvzHANwdZIiVXkOLs6unOZW2oqjZfvRpP/IqgkYH4xty1UorSlyHGDT/FiEzFASs1fXl+PaizOsGoV4ElRhWRAKRI4DeLv64lDESfB4fE4Ao+lH/2unN31naNxFcsSHZsJD7Nk/5nAF4oJSMGdCADH7my/yUF5fxNCMFXljb0gaPCVeQ2MOAcyWL8LuUO5N1efa1qVDWtlumK0mG4Cp7rOxfXkipCLbW5XdADzwcXD1KSjcfIjZX76fjWdN94Y0PIqP8OlRiJwXDT7LstkNEDw5EtFLdhIn/6B7hxNViQBoUKAw3zsQ6+bFEKHtBljlFwWJUDYA8EdH/rM9P26shFb/CRK+G5b6hMFTMm5QToOmAb4TNfj98NvmecN91LUy7wcjnoTEUvyFwf8A/7wCPwH4kaBQM3z+SQAAAABJRU5ErkJggg==",
        "hexcode": "#93c47d",
    },
    "blue": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA9dJREFUWEftVmtIU2EYfs48a27Oy7xmSs4y1LxDIUVFPywqCsqKTFgX0xYIElH0wx9ZUPSjon5ELrqYXU2qH0oQURHZDSozWbm8ZF7W0C2ntrm5y4mjZm7nnM8tgv707cdh5zzv+z7v837f+37U4mMvGfzDRf0n4K1ArlIOhTzQsyhuJ+B2jb2jKGrs+cPmwPMvVrhBISVagjmRXjZeZf2gt6LH7OAUm1OCutIMhIcECe6KbqMFV1704FHLAEZdgExM4ZY6CxHBwgQYhoG6qglag+3PCYw6Xbj09CtuvumD0/3bj3ppLLYtSSBu44fNBlTUd/JiOArUl2ZCESLzAOsHrCi/o8PnfrvH+5nBNG6osyER04IE7A4XCjWNMAw7/4zAp95B7K/VwTwyJe0JV4fXJSIvPYaYfXXDV2iefRPEEBX42DOIvTU6WEa5wTNipTi3PXNyU/JFMA3bUKBpgtUh3GoECfSaLCip1mLQxg1OgYFGlYq0+DBi9sfrdahrHiBieAnIpDNQfLkZHSbPmv/ytDI1DIfWpxAdtxmGsLNKCzczfmyFFi+BKy/1qH1n5LWR0MDNkizEhEmJjsuufcDbbisRM9ZXvBvRyXwlDtztBFf4cV87FsWgZHki0XGDrh8H77ZPG5yXQFywCL3D/OEjgwJwS50DKSuDwHK63FCdb0QXT9fjM/FrGJWvTsCa7FhiZrdfd+PM416fsudVQMgyOToQF4qyIJqYBXy4IesotlQ2Ysju+4T3UQEGZ7cmI1sZTszszIM23BbYvD6fAj7g8nkhOLppPjF4l9EC1cVmjzkx1UBKAyM83XhaBcQi4HpJBuLChSckG+hgjRYNHcO8JNnNuzZdgarX3KM9LYHChVEozZtLzP5thwllNa2CmCPrlNCbbah8ZuBgiATCpCLU7MmBPFAs6NztZlB08T1ajfxdMy85FIfzU3G1odN/AvtXxGPDgnhi9nXv9Dj+oIsXMydiBjTbMyGT0P4TYI2rirMRIBIJErDaHSiofA+Tdfy6NnXNDBbjnGo+okPHW7bfCpzanITcpEhi9ponHah+1cfBxIXSOL01DbMUv+eFXwQWJQbhREEGMbjBPILC802weyWfFSfD0fxkKOQSD3ufCQRQQPWudCij5EQCFfc+4WHL4CSGFgGq3BjsWJoAOoBbNp8JbMyJxL5VScTg2m4z1NdawDZc9nKybF4odi+bDWW0MGmfCagWRkzKx16nPdbE3/va72g32hERCKxJVyBWIQPLhmF/DEDRYoDyVOHJxz686bL41weIMvylj9N2wr8UR9DNfwI/AWp5ofBEjHKVAAAAAElFTkSuQmCC",
        "hexcode": "#6fa8dc",
    },
    "pink": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA9JJREFUWEftlmtsU2UYx3/nrF3XdVcYHbKNOWBQZjfM4swU0aiAxKCRYAwqEA2ogQ/zAoozGC+Z8TYviLdoBC9gXNCIUWOyRYgOQ2bEhTInWwduzcJcy7oLbO3a9RxTXCb1nPOunSZ84f12cv7P//k9z/u+5zzSz2xTuYBLugjw7w6krSjGYk+P2ZQxSSEije+UBBISoaERgvvdSBEVy5WzsDhzhRsZONRFuN2v0Wi2oMRbjW1GpqHZcIePU88dYOAzFwQjSBnJONu3kpKbYRijqirHFr/F6OHuqQNERsN4nm3AV3sIKaRMGOU+v4zZj98orL63rhnPmjpdjaYDl/meIDUntppAZx/u1XsY/bUnxsRUlEVp6xZMKWZDgEgwzNGFtUQ6B6cGMHjEQ8fNH6J4RzQGs+vWkHvH5cLqPS98T291g6FG2IHBXzx0LN2FMhjUGKQsLsDZuBlJkgzNg71DHJtfC0OhxAGGT57meOXbKD5t5aoEC5o2kVlRKKzeff8+Bt4/ItTodsBiS6Gl8k1CLq9ucMa6RSz4+E6h8RnXKX4v33numoqWLkBPzUH8Ow7rx6WacLZtwZqfLTRuWf4egYaTk37kNQAF9evwrNiDpOiT25+6nsKnbxIan/7mN/645ZNJk0cFGgC5OAvFPaAbLOels6htKyabxdBcCUc4WvYqY8f7pgYgiir4aDUz11cIjbt3NtJT9W1cyXU7YBRpueISSpuqkGTjaxfqH8FV/DJqX+D/BYiehnk/3se0JXOFxice+Qr/awaH1yAyrnkg/fYSHPvWC5MPu720Ol+H8/4T5weo6WakM2GNx+QAliRKWh/GNidHCNC6ajfD+9sMD2/WxnL8z/yQOEDOY9dQ9OJKYXL/QTcnbvjAUBP9ZwQ7/Xi31ScGINtTKWt/FHOm1dBcjSi4Kt4g1Pynrib9rlIce++m66UDiQPkvXsrsx64Wlh9z64mujd8qasxl9lx/rQZU1pK4gDmUjtlzQ8hJ8mGAOGzQVzza1F6zmo0pkszcTRuwpqfde5dwh2YU38P05c5hNV3PvkdvhrtwTLNy8ZRvxFr0fSJ+IQAbCuLKfl6gzB5wNNPi+MVCIzF6KzXFlL8+VosM2IH27gBVLNMietB0hziKbdt7acM7XX9kzxZxl59HQXblyKbkjTwcQNMq6pk7o7bhNUPNHXhvuodUEGVJTJWLSS/ZjlpjpmGcfEDbF9C8nj7ouN0zBp/7t/dTMjVi5pnI/vecqyFf88GUXU0JllNQo6OTRNLxfeFixGd+WDyL6GwF//95UWAC96BvwAywKAw37aWoAAAAABJRU5ErkJggg==",
        "hexcode": "#c969a1",
    },
    "purple": {
        "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA9pJREFUWEftVllMU0EUPa+F0ioUqIBWAwlCxI2gGNwQlUhQimKMGjHqhxpTNGokgksiq0vALcEVookR1AQwcU1RBDfUgEpcGkVB2ZQKFFQo1NKFZwBFyntvaNXEH99HPzrnnjn33Jl7h5IvyKbxDz/qv4D+DoyZ6AZHJ5FZUTphAk13dv9HUd2/0LZ34NUTNWiagoe3GFIPMbGQlWWfof6kZWAYJUg5K4OTsz0nWUNdCxS5r1Fa9BFGAw07ER/J6WFwdB7EGUPTNFJjb6G6/OvvCzAYjLh2QYnCyxUwmX7xRKwaC9nS8cTsS+5V4cyhJ6wYhgOpmTI4Opk7oK7XICPlIT5WtpqRSNyESDwhg0BgwylArzciYb0CX9S63xNQXdGEY0lFaGs1MAjWxARg8kxPYvaKHCWunivjxBAdqCpXIy2+CDqtkUHgOdoZ21JDQPWcStav5YsW8VF56PjWp2b9kJwCGj+1IjW2EO0smYMCtu0PxkgfV2L2mUeL8ehWLRHDKkAkEiIlJh+qmjbW4IBZI7B2ayCR+EPVZ+yLLsCP22tdCfJy3uDu9UrWIFsBD0kn50Hiyn1VuwIP7ypE+ctmosjujtK/EW2In4KTu0tAc0yIsGU+WLjCj0j8vKQW6XuLB9ycVcCQoXZobuhgDXaUCJCUHg6h0JaT3Gg0IXljHhpVzK7HFmTVMFq12R+BId7EzAquluHiaaVF2bM6wBXp7iXGzkNzweNxX7t2jQ5xcgW0bcxry8VrsQPR+4LgM15KzCz71FPcucZ+eP9IwIRpUkTtDCJuXl/Xgt0b82EysZ9egZAHva5novb9BnSAb0Mh4fhcuEnJ4/b4nntQPm5gFSmW2GH6HHfcyH1nvYCQRd5YstqfmH3ZCxXS4h5wYtbGBqCpvg1XspgzgeiAvdgWyRkyDBpsx0ne2Ulj75YbqKvWsGImBQ3HutgZyMtVWi8gMsoPs2U+xOyL8itw/tgzVozUwx7bD4RAKBJYL0DqMRhxaWHg8XmcAnTf9IiXK9D6Vc/ASFxFiEkJ7m3ZVjuwKTEQ4/xHELO/lPUcN3PLGZghw0SITp4Nl2EOvWtWCRg3yRWbEoKJmzc3apC44SYMevOr5TVWAvmOQIj7PWwtFsDjA3FHQiF1dyIKOHXwAUrvq3oxfD6F0CWjMD/SF3yWslksYFa4J5bLA4ibv3/TiAPb7wJ0zzPdb6oUESt9MZwg2mIBoYu94PDTvj4zubu//WhyxbdroarRwMHZBlOD3eEytKfWXctdT3A+ZQNQ5oe39GEN3r5osr4REa34C4sDtuK/sAeR4r+A7xKVn7Di4g+/AAAAAElFTkSuQmCC",
        "hexcode": "#8e7cc3",
    }
}

// Map envs to colors
var env_color_map = {
    "local": "red",
    "ephemeral": "yellow",
    "dev": "green",
    "staging": "blue",
    "partner": "purple"
}

// Any class listed here will have its background color overridden with the corresponding hexcode
var header_div_classes = ['header', 'grid-header', 'navbar', 'nav-top', 'header-buttons'];

var localhost_hosts = ['localhost', '127.0.0.1', '0.0.0.0'];
var min_localhost_port = '9000'
var max_localhost_port = '9999'

window.addEventListener('load', function() {
    apply_color_coded_environments();
    // Apply again after one second to make sure its applied
    setTimeout(apply_color_coded_environments, 1000);
}, false);

function apply_color_coded_environments() {
    var environment = get_environment();
    var env_color_key = get(env_color_map, environment, null)
    if (env_color_key) {
        var env_color = get(colors, env_color_key, null)
        if (env_color) {
            override_with_env_color(env_color)
        }
    }
}

function override_with_env_color(env_color) {
    var favicon_data = get(env_color, "favicon", null)
    if (favicon_data) {
        set_favicon_data(favicon_data);
    }
    var color_hexcode = get(env_color, "hexcode", null)
    if (color_hexcode) {
        set_header_div_color(color_hexcode);
    }
}

function get_environment() {
    var host = window.location.host
    var port = null
    var port_parts = host.split(':')
    if (port_parts.length > 1) {
        host = port_parts[0]
        port = port_parts[1]
    }
    if (localhost_hosts.includes(host)
        && port >= min_localhost_port
        && port <= max_localhost_port) {
        return "local"
    }
    var domain_parts = host.split('.')
    // Ignore hosts with no subdomain
    if (domain_parts.length <= 2) return null;
    var subdomain = domain_parts[domain_parts.length - 3]
    if (domain_parts.length > 3) {
        var third_domain = domain_parts[domain_parts.length - 4];
        var matches = third_domain.match(/^[a-zA-Z-]*-[a-zA-Z]{2,4}-[0-9]{1,5}$/g)
        if (matches) {
            return "ephemeral";
        }
    }
    return subdomain
}

function set_header_div_color(hexcode) {
    for (var i = 0; i < header_div_classes.length; i++) {
        var header_div_class = header_div_classes[i]
        console.log(header_div_class);
        var header_divs = document.getElementsByClassName(header_div_class);
        for (var j = 0; j < header_divs.length; j++) {
            var header_div = header_divs[j]
            if (header_div) {
                console.log(header_div);
                header_div.style.backgroundColor = hexcode;
                header_div.style.backgroundImage = "none";
            }
        }
    }
}

function set_favicon_data(favicon_data) {
    var head = document.getElementsByTagName('head')[0]
    var new_link = create_new_link(favicon_data)
    remove_existing_favicons_from_head(head, new_link)
	head.appendChild(new_link);
    force_browser_update()
}

function remove_existing_favicons_from_head(head, new_link) {
	var links = head.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].href == new_link.href) return;
		if (links[i].rel == "shortcut icon" || links[i].rel=="icon") head.removeChild(links[i]);
	}
}

function create_new_link(favicon_data) {
	var new_link = document.createElement('link');
	new_link.rel = 'shortcut icon';
	new_link.type = 'image/png';
	new_link.href = favicon_data;
    return new_link
}

function force_browser_update() {
	// Force browser to acknowledge
	var shim = document.createElement('iframe');
	shim.width = shim.height = 0;
	document.body.appendChild(shim);
	shim.src = "icon";
	document.body.removeChild(shim);
}

function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}
