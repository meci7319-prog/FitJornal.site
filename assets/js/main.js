/**
 * FIT Journal — University of Tabriz
 * Vanilla JavaScript interactions for all 7 static pages.
 * Zero external framework dependencies; GitHub Pages compatible.
 */
(function () {
  'use strict';

  /* =========================================================================
     1. Mobile Navigation Drawer
     ========================================================================= */
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
        closeDrawer();
      }
    });
  }

  /* =========================================================================
     2. Global Search Modal (Real Content Only)
     ========================================================================= */
  function initGlobalSearch() {
    const triggerBtn = document.getElementById('global-search-trigger');
    const modal = document.getElementById('global-search-modal');
    if (!triggerBtn || !modal) return;

    const closeBtn = document.getElementById('global-search-close');
    const backdrop = document.getElementById('global-search-backdrop');
    const input = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('global-search-results');

    const catalog = [
      {
        title: 'شماره ۱: انقلاب صنعتی چهارم و پیوند با ساخت و تولید',
        meta: 'شماره منتشرشده · پاییز ۱۴۰۵',
        category: 'شماره نشریه',
        url: 'issue-details.html',
        keywords: 'شماره اول 1 پاییز 1405 هوش مصنوعی انقلاب صنعتی چهارم چفت'
      },
      {
        title: 'نقش هوش مصنوعی در تحول سیستم‌های ساخت و تولید: چشم‌انداز انقلاب صنعتی چهارم',
        meta: 'مقاله شماره ۱ · فناوری‌های نوین تولید',
        category: 'مقاله علمی',
        url: 'articles.html',
        keywords: 'هوش مصنوعی یادگیری ماشین صنعت 4 پایش سایش ابزار نگهداری پیشگیرانه'
      },
      {
        title: 'بررسی تطبیقی فناوری‌های ساخت افزایشی فلزی (SLM و DED) در صنایع هوافضا و پزشکی',
        meta: 'مقاله شماره ۱ · ساخت افزایشی',
        category: 'مقاله علمی',
        url: 'articles.html',
        keywords: 'ساخت افزایشی چاپ سه بعدی فلزی SLM DED تیتانیوم اینکونل'
      },
      {
        title: 'کنترل هوشمند ماشین‌ابزار و اتوماسیون صنعتی: بهینه‌سازی مسیر ابزار در فرزکاری پنج‌محوره',
        meta: 'مقاله شماره ۱ · فرایندهای ساخت و اتوماسیون',
        category: 'مقاله علمی',
        url: 'articles.html',
        keywords: 'ماشین ابزار اتوماسیون صنعتی فرزکاری پنج محوره CAM صافی سطح'
      },
      {
        title: 'آرشیو شماره‌های نشریه چفت',
        meta: 'مشاهده شماره ۱ و وضعیت شماره‌های آتی (در انتظار انتشار)',
        category: 'صفحه',
        url: 'issues.html',
        keywords: 'آرشیو شماره ها انتشار دانلود PDF'
      },
      {
        title: 'درباره نشریه، ارکان علمی و هیئت تحریریه',
        meta: 'معرفی نشریه، دکتر امیر مصطفی‌پور، محمد ولی‌زاد، امید بالاخیال',
        category: 'صفحه',
        url: 'about.html',
        keywords: 'درباره نشریه دانشگاه تبریز محمد ولی زاد امیر مصطفی پور امید بالاخیال سیویلیکا'
      },
      {
        title: 'ارتباط با نشریه و درگاه‌های رسمی',
        meta: 'تلگرام، بله، اینستاگرام، ایمیل و سامانه نشریات دانشگاه تبریز',
        category: 'صفحه',
        url: 'contact.html',
        keywords: 'تماس ارتباط تلگرام بله اینستاگرام ایمیل دانشکده مکانیک'
      }
    ];

    function renderResults(query) {
      const q = (query || '').trim().toLowerCase();
      const filtered = q
        ? catalog.filter(function (item) {
            return (
              item.title.toLowerCase().includes(q) ||
              item.meta.toLowerCase().includes(q) ||
              item.keywords.toLowerCase().includes(q)
            );
          })
        : catalog;

      if (filtered.length === 0) {
        resultsContainer.innerHTML =
          '<div class="p-space-lg text-center flex flex-col items-center gap-space-xs">' +
          '<span class="material-symbols-outlined text-[32px] text-secondary">search_off</span>' +
          '<p class="font-title-md text-title-md text-on-surface">نتیجه‌ای یافت نشد</p>' +
          '<p class="font-body-md text-body-md text-secondary">عبارت جستجو را تغییر دهید یا از منوی اصلی بخش مورد نظر را انتخاب کنید.</p>' +
          '</div>';
        return;
      }

      resultsContainer.innerHTML = filtered
        .map(function (item) {
          return (
            '<a href="' +
            item.url +
            '" class="flex items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group">' +
            '<div class="flex flex-col gap-0.5">' +
            '<span class="font-label-sm text-label-sm text-primary">' +
            item.category +
            '</span>' +
            '<span class="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">' +
            item.title +
            '</span>' +
            '<span class="font-label-md text-label-md text-secondary">' +
            item.meta +
            '</span>' +
            '</div>' +
            '<span class="material-symbols-outlined text-secondary group-hover:text-primary text-[18px] shrink-0">arrow_back</span>' +
            '</a>'
          );
        })
        .join('');
    }

    function openModal() {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      renderResults(input ? input.value : '');
      if (input) {
        setTimeout(function () {
          input.focus();
        }, 50);
      }
    }

    function closeModal() {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    triggerBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (input) {
      input.addEventListener('input', function (e) {
        renderResults(e.target.value);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* =========================================================================
     3. Back to Top & Smooth Anchor Scroll
     ========================================================================= */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 360) {
          btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
          btn.classList.add('opacity-100', 'translate-y-0');
        } else {
          btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
          btn.classList.remove('opacity-100', 'translate-y-0');
        }
      },
      { passive: true }
    );

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================================
     4. FAQ Accordion (index.html)
     ========================================================================= */
  function initFaqAccordion() {
    const toggles = document.querySelectorAll('.faq-toggle');
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.material-symbols-outlined');
        if (!content) return;

        const isHidden = content.classList.contains('hidden');

        document.querySelectorAll('.faq-content').forEach(function (c) {
          c.classList.add('hidden');
        });
        document.querySelectorAll('.faq-toggle').forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
          const ic = t.querySelector('.material-symbols-outlined');
          if (ic) ic.classList.remove('rotate-180');
        });

        if (isHidden) {
          content.classList.remove('hidden');
          toggle.setAttribute('aria-expanded', 'true');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    });
  }

  /* =========================================================================
     5. Issues Archive Filter & Sorting (issues.html)
     ========================================================================= */
  function initIssuesArchive() {
    const grid = document.getElementById('journalGrid');
    if (!grid) return;

    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const issueFilter = document.getElementById('issueFilter');
    const sortFilter = document.getElementById('sortFilter');
    const statusTabs = document.querySelectorAll('.status-tab');
    const cards = Array.from(document.querySelectorAll('.journal-card'));
    const emptyState = document.getElementById('issuesEmptyState');
    const resetBtn = document.getElementById('resetIssuesFilters');

    let currentStatus = 'all';

    function applyFilters() {
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const selectedYear = yearFilter ? yearFilter.value : 'all';
      const selectedIssue = issueFilter ? issueFilter.value : 'all';
      let visibleCount = 0;

      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const cardStatus = card.getAttribute('data-status');
        const cardYear = card.getAttribute('data-year');
        const cardIssue = card.getAttribute('data-issue');

        const matchesQuery = !query || text.includes(query);
        const matchesStatus = currentStatus === 'all' || cardStatus === currentStatus;
        const matchesYear = selectedYear === 'all' || cardYear === selectedYear;
        const matchesIssue = selectedIssue === 'all' || cardIssue === selectedIssue;

        if (matchesQuery && matchesStatus && matchesYear && matchesIssue) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
        } else {
          emptyState.classList.add('hidden');
          emptyState.classList.remove('flex');
        }
      }
    }

    function applySorting() {
      if (!sortFilter) return;
      const sortMode = sortFilter.value;
      const sorted = cards.slice().sort(function (a, b) {
        const issueA = parseInt(a.getAttribute('data-issue'), 10) || 0;
        const issueB = parseInt(b.getAttribute('data-issue'), 10) || 0;
        // 'newest' lists Issue 1 (most recent published) first, or Issue 6->1 depending on user expectation;
        // In Stitch original: newest -> issueA - issueB (Issue 1 lead card first), oldest -> issueB - issueA
        return sortMode === 'newest' ? issueA - issueB : issueB - issueA;
      });
      sorted.forEach(function (card) {
        grid.appendChild(card);
      });
    }

    statusTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        statusTabs.forEach(function (t) {
          t.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm', 'active');
          t.classList.add('text-secondary');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm', 'active');
        tab.classList.remove('text-secondary');
        tab.setAttribute('aria-selected', 'true');

        currentStatus = tab.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (issueFilter) issueFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applySorting);

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (yearFilter) yearFilter.value = 'all';
        if (issueFilter) issueFilter.value = 'all';
        currentStatus = 'all';
        statusTabs.forEach(function (t) {
          const isAll = t.getAttribute('data-filter') === 'all';
          t.classList.toggle('bg-surface-container-lowest', isAll);
          t.classList.toggle('text-on-surface', isAll);
          t.classList.toggle('shadow-sm', isAll);
          t.classList.toggle('active', isAll);
          t.classList.toggle('text-secondary', !isAll);
          t.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        applyFilters();
      });
    }
  }

  /* =========================================================================
     6. Articles Discovery Filter & Search (articles.html)
     ========================================================================= */
  function initArticlesDiscovery() {
    const articles = document.querySelectorAll('.article-item');
    if (!articles.length) return;

    const searchInput = document.getElementById('articleSearchInput');
    const categoryPills = document.querySelectorAll('.category-pill');
    const noResults = document.getElementById('noResultsState');
    const resetBtn = document.getElementById('resetArticleFilters');

    let currentCategory = 'all';
    let currentQuery = '';

    function filterArticles() {
      let matchCount = 0;

      articles.forEach(function (article) {
        const category = article.getAttribute('data-category');
        const textContent = article.textContent.toLowerCase();

        const matchesCategory = currentCategory === 'all' || category === currentCategory;
        const matchesQuery = !currentQuery || textContent.includes(currentQuery.toLowerCase());

        if (matchesCategory && matchesQuery) {
          article.style.display = 'flex';
          matchCount++;
        } else {
          article.style.display = 'none';
        }
      });

      if (noResults) {
        if (matchCount === 0) {
          noResults.classList.remove('hidden');
          noResults.classList.add('flex');
        } else {
          noResults.classList.add('hidden');
          noResults.classList.remove('flex');
        }
      }
    }

    categoryPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        categoryPills.forEach(function (p) {
          p.classList.remove('bg-primary', 'text-on-primary', 'active');
          p.classList.add('bg-surface-container-low', 'text-secondary');
        });

        pill.classList.remove('bg-surface-container-low', 'text-secondary');
        pill.classList.add('bg-primary', 'text-on-primary', 'active');

        currentCategory = pill.getAttribute('data-filter') || 'all';
        filterArticles();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentQuery = e.target.value.trim();
        filterArticles();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.activeElement === searchInput) {
          searchInput.value = '';
          currentQuery = '';
          filterArticles();
          searchInput.blur();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        currentQuery = '';
        currentCategory = 'all';
        categoryPills.forEach(function (p) {
          const isAll = p.getAttribute('data-filter') === 'all';
          p.classList.toggle('bg-primary', isAll);
          p.classList.toggle('text-on-primary', isAll);
          p.classList.toggle('active', isAll);
          p.classList.toggle('bg-surface-container-low', !isAll);
          p.classList.toggle('text-secondary', !isAll);
        });
        filterArticles();
      });
    }
  }

  /* =========================================================================
     7. Citation Copy (issue-details.html)
     ========================================================================= */
  function initCitationCopy() {
    const copyBtn = document.getElementById('copy-citation-btn');
    const copyText = document.getElementById('copy-text');
    if (!copyBtn || !copyText) return;

    copyBtn.addEventListener('click', function () {
      const citation =
        'نشریه علمی-دانشجویی چفت، شماره ۱، پرونده ویژه انقلاب صنعتی چهارم و هوش مصنوعی در ساخت و تولید، دانشکده مهندسی مکانیک ساخت و تولید دانشگاه تبریز، پاییز ۱۴۰۵.';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citation).then(function () {
          copyText.textContent = 'کپی شد!';
          setTimeout(function () {
            copyText.textContent = 'کپی ارجاع نامه';
          }, 2200);
        });
      }
    });
  }

  /* =========================================================================
     8. Contact Form Validation & Visual Demo Notice (contact.html)
     ========================================================================= */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const errorBox = document.getElementById('contact-error-banner');
    const errorText = document.getElementById('contact-error-text');
    const demoBanner = document.getElementById('confirmation-banner');
    const copyEmailBtn = document.getElementById('copy-official-email');

    function showError(msg) {
      if (errorBox && errorText) {
        errorText.textContent = msg;
        errorBox.classList.remove('hidden');
        errorBox.classList.add('flex');
      }
      if (demoBanner) {
        demoBanner.classList.add('hidden');
        demoBanner.classList.remove('flex');
      }
    }

    function clearError() {
      if (errorBox) {
        errorBox.classList.add('hidden');
        errorBox.classList.remove('flex');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      const nameVal = (fullName ? fullName.value : '').trim();
      const emailVal = (email ? email.value : '').trim();
      const subjectVal = (subject ? subject.value : '').trim();
      const messageVal = (message ? message.value : '').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nameVal.length < 3) {
        showError('لطفاً نام و نام خانوادگی معتبر (حداقل ۳ حرف) وارد نمایید.');
        if (fullName) fullName.focus();
        return;
      }
      if (!emailRegex.test(emailVal)) {
        showError('لطفاً یک نشانی ایمیل معتبر وارد نمایید.');
        if (email) email.focus();
        return;
      }
      if (subjectVal.length < 3) {
        showError('لطفاً موضوع پیام خود را وارد نمایید.');
        if (subject) subject.focus();
        return;
      }
      if (messageVal.length < 10) {
        showError('لطفاً متن پیام را با حداقل ۱۰ کاراکتر بنویسید.');
        if (message) message.focus();
        return;
      }

      if (demoBanner) {
        demoBanner.classList.remove('hidden');
        demoBanner.classList.add('flex');
        demoBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', function () {
        const officialEmail = 'mr.mohammadvalizade7@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(officialEmail).then(function () {
            const label = copyEmailBtn.querySelector('span:last-child');
            if (label) {
              const prev = label.textContent;
              label.textContent = 'نشانی ایمیل کپی شد';
              setTimeout(function () {
                label.textContent = prev;
              }, 2200);
            }
          });
        }
      });
    }
  }

  /* =========================================================================
     9. Account Page Tabs & Client-Side Validation Only (account.html)
     ========================================================================= */
  function initAccountPage() {
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const loginTabBtn = document.getElementById('tab-btn-login');
    const registerTabBtn = document.getElementById('tab-btn-register');

    if (!loginForm || !registerForm || !loginTabBtn || !registerTabBtn) return;

    const toast = document.getElementById('notice-toast');
    const toastText = document.getElementById('notice-text');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    let toastTimer = null;
    function showNotice(message) {
      if (!toast || !toastText) return;
      toastText.textContent = message;
      toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.add('opacity-100', 'translate-y-0');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        toast.classList.remove('opacity-100', 'translate-y-0');
      }, 4200);
    }

    function switchTab(type) {
      if (loginError) loginError.classList.add('hidden');
      if (registerError) registerError.classList.add('hidden');

      if (type === 'login') {
        loginForm.classList.remove('hidden');
        loginForm.classList.add('flex');
        registerForm.classList.add('hidden');
        registerForm.classList.remove('flex');

        loginTabBtn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
        loginTabBtn.classList.remove('text-secondary', 'font-medium');
        loginTabBtn.setAttribute('aria-selected', 'true');

        registerTabBtn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
        registerTabBtn.classList.add('text-secondary', 'font-medium');
        registerTabBtn.setAttribute('aria-selected', 'false');
      } else {
        registerForm.classList.remove('hidden');
        registerForm.classList.add('flex');
        loginForm.classList.add('hidden');
        loginForm.classList.remove('flex');

        registerTabBtn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
        registerTabBtn.classList.remove('text-secondary', 'font-medium');
        registerTabBtn.setAttribute('aria-selected', 'true');

        loginTabBtn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
        loginTabBtn.classList.add('text-secondary', 'font-medium');
        loginTabBtn.setAttribute('aria-selected', 'false');
      }
    }

    loginTabBtn.addEventListener('click', function () {
      switchTab('login');
    });
    registerTabBtn.addEventListener('click', function () {
      switchTab('register');
    });

    // Password visibility buttons
    document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('.material-symbols-outlined');
        if (!input || !icon) return;
        if (input.type === 'password') {
          input.type = 'text';
          icon.textContent = 'visibility_off';
        } else {
          input.type = 'password';
          icon.textContent = 'visibility';
        }
      });
    });

    const forgotLink = document.getElementById('forgot-password-link');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        showNotice('بازیابی رمز عبور در نسخه نمایشی رابط کاربری غیرفعال است.');
      });
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (loginError) loginError.classList.add('hidden');

      const identifier = (document.getElementById('login-identifier').value || '').trim();
      const password = document.getElementById('login-password').value || '';

      if (identifier.length < 5) {
        if (loginError) {
          loginError.textContent = 'لطفاً شماره موبایل یا آدرس ایمیل معتبر وارد نمایید.';
          loginError.classList.remove('hidden');
        }
        return;
      }
      if (password.length < 6) {
        if (loginError) {
          loginError.textContent = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
          loginError.classList.remove('hidden');
        }
        return;
      }

      showNotice('این بخش صرفاً پیش‌نمایش رابط کاربری است و احراز هویت واقعی فعال نیست.');
    });

    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (registerError) registerError.classList.add('hidden');

      const name = (document.getElementById('reg-name').value || '').trim();
      const mobile = (document.getElementById('reg-mobile').value || '').trim();
      const email = (document.getElementById('reg-email').value || '').trim();
      const pass = document.getElementById('reg-password').value || '';
      const confirmPass = document.getElementById('reg-confirm-password').value || '';
      const terms = document.getElementById('reg-terms');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 3) {
        if (registerError) {
          registerError.textContent = 'لطفاً نام و نام خانوادگی خود را به صورت کامل وارد نمایید.';
          registerError.classList.remove('hidden');
        }
        return;
      }
      if (mobile.length < 10) {
        if (registerError) {
          registerError.textContent = 'لطفاً شماره موبایل معتبر وارد نمایید.';
          registerError.classList.remove('hidden');
        }
        return;
      }
      if (!emailRegex.test(email)) {
        if (registerError) {
          registerError.textContent = 'لطفاً نشانی ایمیل معتبر وارد نمایید.';
          registerError.classList.remove('hidden');
        }
        return;
      }
      if (pass.length < 8) {
        if (registerError) {
          registerError.textContent = 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
          registerError.classList.remove('hidden');
        }
        return;
      }
      if (pass !== confirmPass) {
        if (registerError) {
          registerError.textContent = 'رمز عبور و تکرار آن یکسان نیستند.';
          registerError.classList.remove('hidden');
        }
        return;
      }
      if (terms && !terms.checked) {
        if (registerError) {
          registerError.textContent = 'لطفاً قوانین و راهنماهای نشریه چفت را بپذیرید.';
          registerError.classList.remove('hidden');
        }
        return;
      }

      showNotice('فرم ثبت‌نام صرفاً جهت نمایش رابط کاربری است و هیچ اطلاعاتی ذخیره نمی‌شود.');
    });
  }

  /* =========================================================================
     Initialize on DOM Ready
     ========================================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initGlobalSearch();
    initBackToTop();
    initFaqAccordion();
    initIssuesArchive();
    initArticlesDiscovery();
    initCitationCopy();
    initContactForm();
    initAccountPage();
  });
})();
