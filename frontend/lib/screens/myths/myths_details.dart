import 'package:flutter/material.dart';

class MythDetailsPage extends StatelessWidget {
  final Map myth;
  const MythDetailsPage({super.key, required this.myth});

  Widget _buildDetail(String title, dynamic value) {
    String displayValue = "N/A";

    if (value != null) {
      if (value is List) {
        if (value.isNotEmpty) {
          displayValue = value.where((item) => item != null && item.toString().trim().isNotEmpty).join(', ');
          if (displayValue.isEmpty) displayValue = "N/A";
        }
      } else if (value is String) {
        if (value.trim().isNotEmpty) {
          displayValue = value.trim();
        }
      } else {
        String strValue = value.toString().trim();
        if (strValue.isNotEmpty && strValue != 'null') {
          displayValue = strValue;
        }
      }
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$title:",
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.purple),
          ),
          const SizedBox(height: 4),
          Text(displayValue, style: const TextStyle(fontSize: 14)),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(myth['title']), backgroundColor: Colors.purple),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Summary", myth['summary']),
            _buildDetail("Characters Involved", myth['charactersInvolved']),
            _buildDetail("Locations", myth['locations']),
            _buildDetail("Moral", myth['moral']),
            _buildDetail("Source", myth['source']),
          ],
        ),
      ),
    );
  }
}
