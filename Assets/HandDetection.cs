using UnityEngine;
using UnityEngine.Networking;
using Leap;
using Leap.Unity;
using System.Collections;
using System.Text;

public class HandDetection : MonoBehaviour
{
    private LeapServiceProvider leapProvider;
    
    public string AWS_URL = "";

    public float delay = 0.5f;
    
    static float[] angles = new float[2];

    void Start()
    {
        leapProvider = GetComponent<LeapServiceProvider>();
        StartCoroutine(PostRequest(AWS_URL));
        
    }

    void Update()
    {
        Frame frame = leapProvider.CurrentFrame;
        
        angles[0] = 0;
        angles[1] = 0;
        
        foreach (Hand hand in frame.Hands)
        {
            Vector3 armVec = hand.Arm.ElbowPosition - hand.WristPosition;
            Vector3 handVec = hand.PalmPosition - hand.WristPosition;
            Vector3 normVec = Vector3.Cross(hand.PalmNormal, hand.Direction);
            float angle = Vector3.SignedAngle(armVec, handVec, normVec); 
            // >-180 wrist too low, <180 wrist too high

            if (hand.IsLeft) {
                angles[0] = angle;
            } else {
                angles[1] = angle;
            }
        }
    }

    private IEnumerator PostRequest(string url)
    {
        while (true)
        {
            string json = "{\"left\":" + angles[0] + ",\"right\":" + angles[1] + "}";
            Debug.Log("Coroutine is running");
            Debug.Log(angles[0] + ", " + angles[1]);
            
            // potential memory leak
            byte[] jsonBytes = Encoding.UTF8.GetBytes(json);
            UnityWebRequest uwr = new UnityWebRequest(url, "POST");
            uwr.uploadHandler = (UploadHandler)new UploadHandlerRaw(jsonBytes);
            uwr.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            uwr.SetRequestHeader("Content-Type", "application/json");

            // Send the request and wait for it to complete
            yield return uwr.SendWebRequest();

            // Check for errors and handle the response
            if (uwr.result == UnityWebRequest.Result.ConnectionError)
            {
                Debug.Log("Error while sending request: " + uwr.error);
            }
            else
            {
                Debug.Log("Received response: " + uwr.downloadHandler.text);
            }
            // Wait for 1 second before sending the next request
            yield return new WaitForSeconds(delay);

            Debug.Log("Reached the end");
        }
    }
}