[vite] hot updated: /src/app/components/shared/AIBubbleMenu.tsx
[vite] hot updated: /src/styles/index.css
1:22:44 AM [vite] (client) hmr update /src/app/components/profile/ProfileScreen.tsx, /src/styles/index.css
1:22:44 AM [vite] (client) hmr update /src/app/components/shared/AIBubbleMenu.tsx, /src/styles/index.css
❌ 1:22:45 AM [vite] (client) Pre-transform error: src/app/components/shared/AIBubbleMenu.tsx: Expected corresponding JSX closing tag for <motion.div>. (190:4)

  188 |         </motion.button>
  189 |       </motion.div>
> 190 |     </div>
      |     ^
  191 |   );
  192 | }
  193 |
  Plugin: vite:react-babel
  File: src/app/components/shared/AIBubbleMenu.tsx:190:4
  188|          </motion.button>
  189|        </motion.div>
  190|      </div>
     |      ^
  191|    );
  192|  }
❌ [vite] Internal Server Error
src/app/components/shared/AIBubbleMenu.tsx: Expected corresponding JSX closing tag for <motion.div>. (190:4)

  188 |         </motion.button>
  189 |       </motion.div>
> 190 |     </div>
      |     ^
  191 |   );
  192 | }
  193 |
    at toParseError (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parse-error.ts:95:45)
    at TypeScriptParserMixin.raise (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/tokenizer/index.ts:1503:19)
    at TypeScriptParserMixin.jsxParseElementAt (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:527:18)
    at TypeScriptParserMixin.jsxParseElement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:559:19)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:573:21)
    at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
    at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
    at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
    at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
    at fn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3708:23)
    at TypeScriptParserMixin.tryParse (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/util.ts:174:20)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3707:20)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:257:12)
    at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3192:12)
    at TypeScriptParserMixin.parseMaybeAssignAllowIn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:256:17)
    at TypeScriptParserMixin.parseMaybeAssignAllowInOrVoidPattern (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3306:17)
    at TypeScriptParserMixin.parseParenAndDistinguishExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1813:16)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1162:21)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:583:22)
    at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
    at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
    at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
    at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3727:22)
    at TypeScriptParserMixin.parseExpressionBase (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:226:23)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:39)
    at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3187:16)
    at TypeScriptParserMixin.parseExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:17)
    at TypeScriptParserMixin.parseReturnStatement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1110:28)
    at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:538:21)
    at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3185:20)
    at TypeScriptParserMixin.parseStatementLike (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:477:17)
    at TypeScriptParserMixin.parseStatementListItem (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:426:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1439:16)
    at TypeScriptParserMixin.parseBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1412:10)
    at TypeScriptParserMixin.parseBlock (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1380:10)
    at TypeScriptParserMixin.parseFunctionBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2616:24)
    at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2585:10)
    at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:2646:20)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1690:12)
    at TypeScriptParserMixin.withSmartMixTopicForbiddingContext (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3166:14)
    at TypeScriptParserMixin.parseFunction (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1688:10)
❌ src/app/components/shared/AIBubbleMenu.tsx: Expected corresponding JSX closing tag for <motion.div>. (190:4)

  188 |         </motion.button>
  189 |       </motion.div>
> 190 |     </div>
      |     ^
  191 |   );
  192 | }
  193 |
    at toParseError (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parse-error.ts:95:45)
    at TypeScriptParserMixin.raise (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/tokenizer/index.ts:1503:19)
    at TypeScriptParserMixin.jsxParseElementAt (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:527:18)
    at TypeScriptParserMixin.jsxParseElement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:559:19)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:573:21)
    at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
    at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
    at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
    at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
    at fn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3708:23)
    at TypeScriptParserMixin.tryParse (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/util.ts:174:20)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3707:20)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:257:12)
    at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3192:12)
    at TypeScriptParserMixin.parseMaybeAssignAllowIn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:256:17)
    at TypeScriptParserMixin.parseMaybeAssignAllowInOrVoidPattern (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3306:17)
    at TypeScriptParserMixin.parseParenAndDistinguishExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1813:16)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1162:21)
    at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:583:22)
    at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
    at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
    at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
    at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
    at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
    at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3727:22)
    at TypeScriptParserMixin.parseExpressionBase (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:226:23)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:39)
    at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3187:16)
    at TypeScriptParserMixin.parseExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:17)
    at TypeScriptParserMixin.parseReturnStatement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1110:28)
    at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:538:21)
    at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3185:20)
    at TypeScriptParserMixin.parseStatementLike (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:477:17)
    at TypeScriptParserMixin.parseStatementListItem (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:426:17)
    at TypeScriptParserMixin.parseBlockOrModuleBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1439:16)
    at TypeScriptParserMixin.parseBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1412:10)
    at TypeScriptParserMixin.parseBlock (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1380:10)
    at TypeScriptParserMixin.parseFunctionBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2616:24)
    at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2585:10)
    at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:2646:20)
    at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1690:12)
    at TypeScriptParserMixin.withSmartMixTopicForbiddingContext (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3166:14)
    at TypeScriptParserMixin.parseFunction (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1688:10)
❌ 1:22:46 AM [vite] Internal server error: src/app/components/shared/AIBubbleMenu.tsx: Expected corresponding JSX closing tag for <motion.div>. (190:4)

  188 |         </motion.button>
  189 |       </motion.div>
> 190 |     </div>
      |     ^
  191 |   );
  192 | }
  193 |
  Plugin: vite:react-babel
  File: src/app/components/shared/AIBubbleMenu.tsx:190:4
  188|          </motion.button>
  189|        </motion.div>
  190|      </div>
     |      ^
  191|    );
  192|  }
      at toParseError (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parse-error.ts:95:45)
      at TypeScriptParserMixin.raise (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/tokenizer/index.ts:1503:19)
      at TypeScriptParserMixin.jsxParseElementAt (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:527:18)
      at TypeScriptParserMixin.jsxParseElement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:559:19)
      at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:573:21)
      at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
      at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
      at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
      at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
      at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
      at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
      at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
      at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
      at fn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3708:23)
      at TypeScriptParserMixin.tryParse (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/util.ts:174:20)
      at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3707:20)
      at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:257:12)
      at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3192:12)
      at TypeScriptParserMixin.parseMaybeAssignAllowIn (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:256:17)
      at TypeScriptParserMixin.parseMaybeAssignAllowInOrVoidPattern (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3306:17)
      at TypeScriptParserMixin.parseParenAndDistinguishExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1813:16)
      at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:1162:21)
      at TypeScriptParserMixin.parseExprAtom (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/jsx/index.ts:583:22)
      at TypeScriptParserMixin.parseExprSubscripts (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:734:23)
      at TypeScriptParserMixin.parseUpdate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:713:21)
      at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:675:23)
      at TypeScriptParserMixin.parseMaybeUnary (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3855:20)
      at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:409:14)
      at TypeScriptParserMixin.parseExprOps (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:421:23)
      at TypeScriptParserMixin.parseMaybeConditional (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:376:23)
      at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:301:21)
      at TypeScriptParserMixin.parseMaybeAssign (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3727:22)
      at TypeScriptParserMixin.parseExpressionBase (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:226:23)
      at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:39)
      at TypeScriptParserMixin.allowInAnd (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3187:16)
      at TypeScriptParserMixin.parseExpression (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:217:17)
      at TypeScriptParserMixin.parseReturnStatement (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1110:28)
      at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:538:21)
      at TypeScriptParserMixin.parseStatementContent (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:3185:20)
      at TypeScriptParserMixin.parseStatementLike (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:477:17)
      at TypeScriptParserMixin.parseStatementListItem (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:426:17)
      at TypeScriptParserMixin.parseBlockOrModuleBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1439:16)
      at TypeScriptParserMixin.parseBlockBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1412:10)
      at TypeScriptParserMixin.parseBlock (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1380:10)
      at TypeScriptParserMixin.parseFunctionBody (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2616:24)
      at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:2585:10)
      at TypeScriptParserMixin.parseFunctionBodyAndFinish (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/plugins/typescript/index.ts:2646:20)
      at callback (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1690:12)
      at TypeScriptParserMixin.withSmartMixTopicForbiddingContext (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/expression.ts:3166:14)
      at TypeScriptParserMixin.parseFunction (node_modules/.pnpm/@babel+parser@7.28.4/node_modules/@babel/parser/src/parser/statement.ts:1688:10)