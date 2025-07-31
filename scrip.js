        // Initialize form
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
            animateSections();
            setupFormValidation();
        });

        function initializeForm() {
            // Set today's date for signature date
            document.getElementById('signatureDate').valueAsDate = new Date();
            
            // Calculate age from date of birth
            document.getElementById('dob').addEventListener('change', function() {
                const dob = new Date(this.value);
                const today = new Date();
                const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                document.getElementById('age').value = age;
            });
        }

        function animateSections() {
            const sections = document.querySelectorAll('.section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        updateProgress();
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const visibleSections = document.querySelectorAll('.section.visible');
            const progress = (visibleSections.length / sections.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function setupFormValidation() {
            const form = document.getElementById('registrationForm');
            const submitBtn = document.getElementById('submitBtn');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Check if at least one sport is selected
                const sports = document.querySelectorAll('input[name="sports[]"]:checked');
                if (sports.length === 0) {
                    alert('Please select at least one sport.');
                    return;
                }

                // Check agreement checkbox
                const agreement = document.getElementById('agreement');
                if (!agreement.checked) {
                    alert('Please agree to the declaration and consent.');
                    return;
                }

                // Simulate form submission
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Registration submitted successfully! You will receive a confirmation email shortly.');
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted';
                }, 2000);
            });

            // Real-time validation feedback
            const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
            requiredFields.forEach(field => {
                field.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.style.borderColor = '#27ae60';
                    }
                });
            });
        }

        function showHelp() {
            alert('Need help?\n\n• All fields marked with * are mandatory\n• Upload files in PDF, JPG, or PNG format\n• Select at least one sport\n• Ensure all information is accurate\n\nFor technical support, contact: support@geniussports.org');
        }

        // File input preview
        document.addEventListener('change', function(e) {
            if (e.target.type === 'file') {
                const label = e.target.nextElementSibling;
                const files = e.target.files;
                if (files.length > 0) {
                    if (files.length === 1) {
                        label.innerHTML = `<i class="fas fa-check"></i> ${files[0].name}`;
                        label.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    } else {
                        label.innerHTML = `<i class="fas fa-check"></i> ${files.length} files selected`;
                        label.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    }
                }
            }
        });

        // Smooth scrolling for better UX
        document.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('focus', function() {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
