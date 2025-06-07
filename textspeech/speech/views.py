from django.shortcuts import render
from django.http import JsonResponse
from gtts import gTTS
import os

# Create your views here.
def home(request):
    if request.method == "GET":
        return render(request,'home.html')
    elif request.method == "POST":
        username = request.POST.get('username')
        text = request.POST.get('text')

        if not username or not text:
            return JsonResponse({'error': 'Username and text are required.'})
        
        user_folder = os.path.join('media', username)
        os.makedirs(user_folder, exist_ok=True)

        filename = 'speech.mp3'
        filepath = os.path.join(user_folder, filename)

        try:
            tts = gTTS(text=text, lang='en')
            tts.save(filepath)

            file_url = '/' + filepath.replace('\\', '/')
            return JsonResponse({'file_url': file_url})
        except Exception as e:
            return JsonResponse({'error': str(e)})
    
    return render(request, 'tts_form.html')