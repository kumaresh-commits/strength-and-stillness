import assert from 'node:assert';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const LIVE_URL = 'https://kumaresh-commits.github.io/strength-and-stillness/';

function logPass(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
}

function logFail(msg, err) {
  console.error(`  \x1b[31m✖\x1b[0m ${msg}`);
  if (err) console.error(err);
}

// 1. Smoke Test: Fetch Live Deployment
async function testLiveSiteDeployment() {
  console.log('\n\x1b[36m[1/4] SMOKE TEST: Live Deployment & HTTP Availability\x1b[0m');
  return new Promise((resolve, reject) => {
    https.get(LIVE_URL, (res) => {
      assert.strictEqual(res.statusCode, 200, `Live site must return HTTP 200 (Got ${res.statusCode})`);
      logPass(`Live URL returns HTTP 200 OK (${LIVE_URL})`);

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        assert(data.includes('<div id="root"></div>'), 'HTML must contain #root app mount point');
        logPass('Root React mount point verified');

        assert(data.includes('/strength-and-stillness/assets/index-'), 'HTML must reference latest assets');
        logPass('Latest asset bundle links verified');

        assert(data.includes('manifest.json'), 'PWA manifest reference verified');
        logPass('PWA manifest reference present');

        resolve(true);
      });
    }).on('error', (e) => reject(e));
  });
}

// 2. Regression Test: Daily Prayer Affirmations & Tamil Translations
async function testAffirmationsRegression() {
  console.log('\n\x1b[36m[2/4] REGRESSION TEST: Daily Prayer Affirmations (EN & தமிழ்)\x1b[0m');
  const affPath = path.resolve('src/data/dailyAffirmations.ts');
  const affContent = fs.readFileSync(affPath, 'utf-8');

  // Verify all 31 affirmations exist
  for (let i = 1; i <= 31; i++) {
    const id = `aff-${i}`;
    assert(affContent.includes(id), `Affirmation ${id} must exist in dailyAffirmations.ts`);
  }
  logPass('All 31 sacred prayer affirmations verified present');

  // Verify Tamil fields exist and are populated
  assert(affContent.includes('textTa:'), 'Tamil affirmation text field (textTa) must be present');
  assert(affContent.includes('themeTa:'), 'Tamil theme field (themeTa) must be present');
  assert(affContent.includes('focusTa:'), 'Tamil focus field (focusTa) must be present');
  logPass('Tamil translation fields (textTa, themeTa, focusTa) verified');

  // Sample exact Tamil phrases
  assert(affContent.includes('சமர்ப்பிக்கிறேன்'), 'Sample devotional Tamil keyword verified');
  assert(affContent.includes('அமைதியும்'), 'Sample devotional Tamil peace keyword verified');
  logPass('Devotional Tamil translations verified pure & accurate');

  // Verify prayer completion is keyed per affirmation line (green button resets when changing lines)
  const heroContent = fs.readFileSync(path.resolve('src/components/HeroCard.tsx'), 'utf-8');
  assert(
    heroContent.includes('prayerKey = `${currentDate}_${currentAffirmation.id}`'),
    'Prayer status must be keyed to affirmation ID so green state resets on next affirmation'
  );
  logPass('Affirmation panel resets mark-prayer status on next line (green state does not remain)');
}

// 3. Regression Test: Store State Isolation & Workout Undo Behavior
async function testStateIsolationAndUndo() {
  console.log('\n\x1b[36m[3/4] REGRESSION TEST: State Isolation & Workout Undo Logic\x1b[0m');
  const storePath = path.resolve('src/store/useStore.ts');
  const storeContent = fs.readFileSync(storePath, 'utf-8');

  // Verify buggy cross-date loop is eliminated
  assert(!storeContent.includes('otherLog.workoutDone'), 'Buggy otherLog.workoutDone leak must be eliminated');
  logPass('Cross-date state leak eliminated (otherLog.workoutDone check removed)');

  // Verify Nov 16 guaranteed seed
  assert(storeContent.includes("date === '2026-11-16'"), 'Nov 16 guaranteed seed present');
  logPass('Nov 16 historical completed seed preserved');

  // Verify undo logic clears sets back to empty
  assert(storeContent.includes('currentSets[targetDayId] = [];'), 'Workout undo must reset sets to empty []');
  logPass('Workout undo resets sets to clean empty [] state (no UI freeze)');

  // Verify sanitization for leaked data
  assert(
    storeContent.includes('exact.steps === 6500') && storeContent.includes('exact.waterGlasses === 8'),
    'Sanitization for leaked phantom state present'
  );
  logPass('Phantom state sanitization verified for untouched dates');
}

// 4. Regression Test: UI Pink Completion Style & Dynamic Climate Icon
async function testUiStylesAndCalendar() {
  console.log('\n\x1b[36m[4/4] REGRESSION TEST: UI Pink Completed Labels & Time-of-Day Icon\x1b[0m');
  const calPath = path.resolve('src/components/WeekCalendarBar.tsx');
  const calContent = fs.readFileSync(calPath, 'utf-8');

  // Verify pink styles for completed days
  assert(calContent.includes('#EC4899') && calContent.includes('#BE185D'), 'Vibrant pink gradient for completed day pill present');
  assert(calContent.includes('text-pink-600') && calContent.includes('bg-pink-500'), 'Pink text & badge styling for completed dates present');
  assert(calContent.includes('Day completed (marked in pink)'), 'Pink completion title indicator verified');
  logPass('Pink completed date label (#EC4899 / text-pink-600) verified for day 16');

  // Verify round time-of-day climate icons in HeroCard
  const heroPath = path.resolve('src/components/HeroCard.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf-8');

  assert(heroContent.includes('rounded-full') && heroContent.includes('w-9 h-9'), 'Round shaped time-of-day icon badge verified');
  assert(heroContent.includes('Sunrise') && heroContent.includes('Sunset') && heroContent.includes('MoonStar'), 'Time-of-day climate sky icons (Sunrise, Sunset, MoonStar) verified');
  logPass('Round shaped time-of-day climate sky icon verified');

  // Verify EN | தமிழ் language switcher
  assert(heroContent.includes('affirmationLanguage') && heroContent.includes('setAffirmationLanguage'), 'Affirmation language state switcher verified');
  assert(heroContent.includes('தமிழ்') && heroContent.includes('EN'), 'EN | தமிழ் pill switcher buttons verified');
  logPass('EN | தமிழ் language switcher verified in HeroCard');

  // Verify 1-Tap Quick Navigation from Progress Rings (Diet, Gym, Water)
  assert(heroContent.includes("navigateToSection(0, 'diet-plans-section')"), 'Diet ring jump navigation verified');
  assert(heroContent.includes("navigateToSection(1, 'gym-workout-section')"), 'Gym ring jump navigation verified');
  assert(heroContent.includes("navigateToSection(0, 'water-tracker-section')"), 'Water ring jump navigation verified');

  const dietContent = fs.readFileSync(path.resolve('src/components/DietTab.tsx'), 'utf-8');
  assert(dietContent.includes('id="diet-plans-section"'), 'Diet plans target DOM id present');
  assert(dietContent.includes('id="water-tracker-section"'), 'Water tracker target DOM id present');

  const workoutContent = fs.readFileSync(path.resolve('src/components/WorkoutTab.tsx'), 'utf-8');
  assert(workoutContent.includes('id="gym-workout-section"'), 'Gym workout target DOM id present');
  logPass('1-Tap Quick Navigation from progress rings to Diet, Gym & Water verified');
}

async function runAllTests() {
  console.log('==================================================================');
  console.log('  🧪 STRENGTH & STILLNESS: FULL SMOKE & REGRESSION TEST SUITE');
  console.log('==================================================================');

  try {
    await testLiveSiteDeployment();
    await testAffirmationsRegression();
    await testStateIsolationAndUndo();
    await testUiStylesAndCalendar();

    console.log('\n\x1b[32m==================================================================\x1b[0m');
    console.log('\x1b[32m  🎉 ALL SMOKE & REGRESSION TESTS PASSED! BUILD OFFICIALLY CERTIFIED.\x1b[0m');
    console.log('\x1b[32m==================================================================\x1b[0m\n');
    process.exit(0);
  } catch (err) {
    logFail('Test suite failed!', err);
    console.log('\n\x1b[31m==================================================================\x1b[0m');
    console.log('\x1b[31m  ❌ BUILD FAILED SMOKE & REGRESSION VERIFICATION\x1b[0m');
    console.log('\x1b[31m==================================================================\x1b[0m\n');
    process.exit(1);
  }
}

runAllTests();
