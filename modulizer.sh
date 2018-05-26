modulizer --out . \
--import-style name \
--npm-name @kano/kwc-auth \
--npm-version 3.0.0-beta.3 \
--dependency-mapping kwc-icons,@kano/kwc-icons,3.0.0-beta.2 \
--dependency-mapping kwc-style,@kano/kwc-style,3.0.0-beta.2 \
--dependency-mapping kwc-behaviours,@kano/kwc-behaviors,3.0.0-beta.2
sed -i "s|import '@kano/kwc-behaviors/kano-validation.js';|import { Behaviour as ValidationBehavior } from '@kano/kwc-behaviors/kano-validation.js';|g" kwc-auth.js
sed -i "s|Kano.Validation.Behaviour|ValidationBehavior|g" kwc-auth.js
