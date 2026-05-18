(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navList && navList.classList.remove('is-open');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // FAQ accordion
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var answer = document.getElementById(this.getAttribute('aria-controls'));
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        var otherBtn = other.querySelector('.faq-question');
        var otherAnswer = otherBtn && document.getElementById(otherBtn.getAttribute('aria-controls'));
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
